require('dotenv').config();

const moment = require('moment');
const Items = require('./services/items.js');

const run = async () => {
    if(process.argv && process.argv.length < 3){
        console.error('Wrong format. Please use `node index.js operation_name [params]`');
        process.exit(-1);
    }
    
    switch(process.argv[2]) {
        //lista todas as tarefas
        case 'list-tasks':
            if(!process.argv[3] || !parseInt(process.argv[3])){
                console.error('The 3 parameter must be a non null integer');
                process.exit(-1);
            }

            const items = await Items.getTasks();
            const index = parseInt(process.argv[3]);

            if(items.length == 0){
                if(index === 1)
                    console.log('No tasks today! Enjoy your day 🙌');
            } else {
                if(index <= items.length)
                    console.log(items[index-1].content);
            }
            break;
        case 'incomplete-tasks': 
            const tasks = await Items.getTasks();
            switch(process.argv[3]) {
                case '--today': 
                    const today_tasks = tasks.filter((task)=>{
                        return task.due_date_utc && moment(task.due_date_utc).isSameOrBefore(moment().endOf('day'));
                    });

                    if(today_tasks.length == 1)
                        console.log(`${today_tasks[0].content}`);
                    else
                        console.log(`${today_tasks.length} Tasks Today`);
                    
                    break;
                default: 
                    console.log(`${tasks.length} tasks`);
                    break;
            }
                
            break;
        default: 
            console.error(`Operation not found: ${process.argv[2]}`);
            break;
    } 
};

run();
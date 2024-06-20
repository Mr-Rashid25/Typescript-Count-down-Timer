#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.yellow('\t\t_______________________________________________________________\n'));

console.log(chalk.bold.green("\t\t>>>>>>>>>>>> Wellcome to Rashid's Countdown Wizard <<<<<<<<<<<"))
console.log(chalk.bold.yellow('\t\t_______________________________________________________________'));

let res = await inquirer.prompt(
    {
        name: "userinput",
        type: "number",
        message: chalk.blue("\nPlease Enter a Number to Count Down b/w (1 - 60)"),
        validate: (input)=>{
            if (isNaN(input)){
                return "Please Enter a Valid Number"
            }
            else if (input>60){
                return chalk.red("Please Enter a Number b/w (1 - 60)")
            }
            else{
                return true;
            }
        }
    }
)
let input = res.userinput;
function setTime(val:number){
    const intialTime = new Date().setSeconds(new Date().getSeconds() + val+2 )
    const intervalTime = new Date(intialTime);
    setInterval(()=>{
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime,currentTime);
        if (timeDiff <=0){
            console.log(chalk.yellowBright(`Remaining seconds: 00:00`));
console.log(chalk.greenBright("Timer stoped\nCount Down Completed"));

            process.exit();
        }
        const min = Math.floor((timeDiff%(3600*24))/3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.redBright(`Remaining seconds: ${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        
    }, 1000);
}
setTime(input)


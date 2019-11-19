const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var monthName = ''
rl.question('Enter a month number: ', (monthNum) => {
    // TODO: Log the answer in a database
    //console.log(`Thank you for your valuable feedback: ${answer}`);
    switch (monthNum) {
        case "1":
            monthName = "Jan"
            break
        case '2':
            monthName = "Feb"
            break
        case '3':
            monthName = "Mar"
            break
        case '4':
            monthName = "Apl"
            break
        case '5':
            monthName = "May"
            break
        case '6':
            monthName = "Jun"
            break
        case '7':
            monthName = "Jul"
            break
        case '8':
            monthName = "Aug"
            break
        case '9':
            monthName = "Sep"
            break
        case '10':
            monthName = "Oct"
            break
        case '11':
            monthName = "Nov"
            break
        case '12':
            monthName = "Dec"
            break
        default:
            console.log('Error')

    }
    console.log(monthName)
    rl.close();
});


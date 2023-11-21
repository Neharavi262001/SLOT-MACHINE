//1. Deposit some money
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4.Spin the slot machine
//5. check if the user won
//6. give the user their winning
//7.play again

const prompt= require("prompt-sync")();


//Rows and columns
const ROWS=3;
const COLS=3;

//define values and counts for symbols
const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8

};

const SYMBOLS_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
};



//1. Deposit some money
const deposit=()=>{
    while (true) {
        const depositAmount=prompt("Enter a deposit amount: ");
        const numberDepositAmount=parseFloat(depositAmount);
    
        if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
            console.log("Invalid Deposit Amount ! Try again.")
        }else {
            return numberDepositAmount
        }
    }
};


//2. Determine number of lines to bet on
const lines=()=>{
    while (true){
        const numberOfLines=prompt("Enter the number of lines to bet on between 1-3 :" );
        const getNumberOfLines = parseFloat(numberOfLines);
        if (isNaN(getNumberOfLines) || (getNumberOfLines<=0) || (getNumberOfLines>3)){
            console.log("Invalid input.Try again!")
        }else{
            return getNumberOfLines
        }
    }
};

//3. Collect a bet amount
const bet=(balance,lines)=>{
    while (true){
        const getbetAmount=prompt("Enter the bet amount per each line :" );
        const  betAmount= parseFloat(getbetAmount);
        if (isNaN(betAmount) || (betAmount<=0) || (betAmount>balance/lines)){
            console.log("Invalid input.Try again!")
        }else{
            return betAmount;
        }
    }

};


//4.Spin the slot machine
const spin=() =>{
    const symbols=[];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT) ){
        for (let i=0; i<count; i++){

            symbols.push(symbol);
       
        }   
    }
    console.log(symbols);

    //or use the below code
    //capturing avaliable symbols and their count into an array
    // const symbols = [];
  
    // for (const symbol in SYMBOLS_COUNT) {
    //   const count = SYMBOLS_COUNT[symbol];
    //   for (let i = 0; i < count; i++) {
    //     symbols.push(symbol);
    //   }
    // }
  


  
    //generation of random numbers in the 3 positions of reels
    //matrix generation where outerloop[i] for cols and inner loop [j] for columns
    const reels=[];
    for (let i=0; i<COLS; i++){
        reels.push([]) //columns required will be added as we loop through and each nested array represents a column:[[],[],[]]
        const reelSymbols=[...symbols]; // copying original array to remove elements and not affecting original array
        for (let j=0; j< ROWS; j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol=reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);

        }
        
    }

    return reels;


  };

//5. check if the user won

// find the transpose of the reel to convert rows to columns and vise versa
//Earlier  we used outer loop for cols and inner lopp for rows
//Here interchange outer loop for rows and inner loop for cols

const transpose=(reels) =>{
    const rows=[];
    for (let i=0;i<ROWS; i++){
       
        rows.push([]);
        for (let j=0;j<COLS; j++){
            rows[i].push(reels[j][i]);
        }

    }
    return rows;
};

//print the spin to the user
//CONVERT TO STRINGS
const printRows=(rows)=>{
    for (const row of rows){
        const rowString=row.join(' | ');
        console.log(rowString)
    }
}


//  const printRows=(rows)=>{
//     for (const row of rows){
//         let rowString="";
//         for (const[i,symbol] of row.entries()){
//             rowString+= symbol;
//             if (i!=row.length-1){
//                 rowString +='|'
//             }
//         }
//         console.log(rowString)
//     }
//  }



//6.Give the user the winnings

const getWinnings=(rows,bets,lines)=>{
    let winnings=0;
    for (row=0;row<lines;row++){
        const symbols=rows[row];
        let allSame=true;
        for (symbol of symbols){
            if (symbol != symbols[0]){
                allSame=false;
                break;
            }
        }


        if (allSame){
            winnings+=bets*SYMBOLS_VALUES[symbols[0]];

        }
    }
    return winnings;
}













let depositAmount =deposit();
 

const numberOfLines=lines();


const betAmount=bet(depositAmount,numberOfLines);


const reels=spin();


const rows=transpose(reels);


printRows(rows);


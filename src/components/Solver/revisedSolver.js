import utils from "./utils";
import pieces from "./pieces";
import genMoves from "./generatedMoves";
import star from "./lastEdgeStar";
import solveStar from "./solveStar";
import alignCorners from "./alignCorners";
import solveCorners from "./solveCorners";

/*
 *  revisedSolved.js
 *
 *  - Loops through all pieces in a predefined order.
 * 
 *  - Solve moves have already been generated for all pieces, except the last 
 *  layer.
 * 
 *  - This function updates the deca object with each piece and then resets the
 *  deca object at the end of the function to its state before the solver was
 *  called. This function returns a set of moves solving the cube.
 */
const revisedSolver = (deca) =>{
    let validSolve = false;

    const lastFiveEdges = [
        ["lightblue","white"],
        ["lightblue","purple"],
        ["lightblue","orange"],
        ["lightblue","lightgreen"],
        ["lightblue","lightbrown"]
    ];

    const lastFiveCorners = [
        ["lightblue","lightbrown","white"],
        ["lightblue","lightgreen","lightbrown"],
        ["lightblue","orange","lightgreen"],
        ["lightblue","purple","orange"],
        ["lightblue","white","purple"]
    ]

    let solveIndex = 0;
    let moves = [];

    // Loop through all non last layer pieces
    while (solveIndex<utils.solveOrder.length){
        let allPieces = pieces(deca);
        let piece = utils.findPiece(allPieces,utils.solveOrder[solveIndex]);
        let pKeys = Object.keys(piece[0]).join("");
        let pValues = Object.values(piece[0]).join("");

        // If the piece isn't a valid piece
        if(Object.keys(piece[0]).length===0) break;

        // Then, check if the piece is already solved
        if(utils.checkAll(allPieces,solveIndex)){
            solveIndex++;
        }

        // Then, check if moves exist for the piece at it's current position
        else if(genMoves[pKeys]&&genMoves[pKeys][pValues]){
            utils.updateDeca(genMoves[pKeys][pValues],deca);
            moves.push(...genMoves[pKeys][pValues]);
            solveIndex++;
        }

        // If no set of moves exists the puzzle configuration is invalid
        else break;
    }

    // In the case that a piece wasn't able to be solved
    if(utils.solveOrder.length>solveIndex) {
        //return ['error'].concat(moves);
    }

    // Solve top half here
    else {
        let allPieces = pieces(deca);
        const edges = [];
        let corners = [];

        for(const edge of lastFiveEdges){
            edges.push(utils.findPiece(allPieces,edge)[0]);
        }
        
        // Solves the lightblue star
        let starMoves = star(edges);

        utils.updateDeca(starMoves,deca);
        allPieces = pieces(deca);
        moves.push(...starMoves);

        let pieceToSet = utils.findPiece(allPieces,lastFiveEdges[0])[0];
        let val = utils.colorNames.indexOf(Object.values(pieceToSet)[1]);
        let key = utils.colorNames.indexOf(Object.keys(pieceToSet)[1]);
        let turnsToSetWLb = val-key;
        let adjustmentMoves = [];

        // Makes sure that the white/lightblue edge piece is solved
        //
        // This cuts down on the amount of permutations needed to 
        // solve the top lightblue star.
        for( let i = 0; i < turnsToSetWLb; i++ ){
            adjustmentMoves[i] = "7"
        }

        if(adjustmentMoves.length) {
            utils.updateDeca(adjustmentMoves,deca);
            allPieces = pieces(deca);
            moves.push(...adjustmentMoves);
        }

        for(let i = 0; i < lastFiveEdges.length; i++){
            edges[i]=utils.findPiece(allPieces,lastFiveEdges[i])[0];;
        }

        // Aligns the lightblue star
        let solveStarMoves = solveStar(edges);

        utils.updateDeca(solveStarMoves,deca);
        allPieces = pieces(deca);
        moves.push(...solveStarMoves);

        // Aligns the lightblue corners
        for(let i = 0; i < lastFiveCorners.length; i++){
            corners[i] = utils.findPiece(allPieces,lastFiveCorners[i])[0];
        }

        let cap = 100;
        let counter = 0;

        while(alignCorners(corners).length && counter<cap){
            counter++;
            for(let i = 0; i < lastFiveCorners.length; i++){
                corners[i] = utils.findPiece(allPieces,lastFiveCorners[i])[0];
            }
    
            let alignCornerMoves = alignCorners(corners);
    
            utils.updateDeca(alignCornerMoves,deca);
            allPieces = pieces(deca);
            moves.push(...alignCornerMoves);
        }

        counter = 0;
        while(solveCorners(corners).length && counter<cap){
            counter++;
            for(let i = 0; i < lastFiveCorners.length; i++){
                corners[i] = utils.findPiece(allPieces,lastFiveCorners[i])[0];
            }
    
            let solveCornersMoves = solveCorners(corners);
    
            utils.updateDeca(solveCornersMoves,deca);
            allPieces = pieces(deca);
            moves.push(...solveCornersMoves);
        }

        validSolve = utils.checkFull(allPieces);
    }

    
    // Undo all changes to the deca Object and return the moves
    moves.reverse();
    let inverseMoves = moves.map(m=>m.includes("'")?m.replace("'",""):m+"'");
    utils.updateDeca(inverseMoves,deca);
    moves.reverse();
    
    return validSolve?moves:["error"];
}

export default revisedSolver;
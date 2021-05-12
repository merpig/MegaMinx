import {rotate_point,rToD} from "./utils.js";

// Calculates what turn to make when attempting to move a piece
function calculateTurn(startPoint,newPoint,selectedSide,selectedPiece,touchedEdge){
    // Click/Touch turns for edges
    if(selectedPiece===8){
        let difX = newPoint.x-startPoint.x;
        let turnDirection = difX>0?"":"'";
        if(Math.abs(difX)>.2){
            if(selectedSide==="blue"){
                return "3"+turnDirection;
            }
            else if(selectedSide==="pink"){
                return "1"+turnDirection;
            }
            else if(selectedSide==="yellow"){
                return "1"+turnDirection;
            }
            else if(selectedSide==="red"){
                return "1"+turnDirection;
            }
            else if(selectedSide==="green"){
                return "1"+turnDirection;
            }
            else if(selectedSide==="lightpurple"){
                return "1"+turnDirection;
            }
            else if(selectedSide==="lightblue"){
                return "12"+turnDirection;
            }
            else if(selectedSide==="lightbrown"){
                return "7"+turnDirection;
            }
            else if(selectedSide==="lightgreen"){
                return "7"+turnDirection;
            }
            else if(selectedSide==="orange"){
                return "7"+turnDirection;
            }
            else if(selectedSide==="purple"){
                return "7"+turnDirection;
            }
            else if(selectedSide==="white"){
                return "7"+turnDirection;
            }
        }
        console.log(newPoint.x-startPoint.x)
    }
    else if(selectedPiece===9){
        let newStart = rotate_point(0,0,72,{...startPoint});
        let newCurrent = rotate_point(0,0,72,{...newPoint});
        let difX = newCurrent[0]-newStart[0];
        let turnDirection = difX>0?"":"'";
        if(Math.abs(difX)>.2){
            if(selectedSide==="blue") return "2"+turnDirection;
            else if(selectedSide==="pink") return "3"+turnDirection;
            else if(selectedSide==="yellow") return "4"+turnDirection;
            else if(selectedSide==="red") return "5"+turnDirection;
            else if(selectedSide==="green") return "6"+turnDirection;
            else if(selectedSide==="lightpurple") return "2"+turnDirection;

            else if(selectedSide==="lightblue") return "8"+turnDirection;
            else if(selectedSide==="lightbrown") return "12"+turnDirection;
            else if(selectedSide==="lightgreen") return "8"+turnDirection;
            else if(selectedSide==="orange") return "9"+turnDirection;
            else if(selectedSide==="purple") return "10"+turnDirection;
            else if(selectedSide==="white") return "11"+turnDirection;
        }
    }
    else if(selectedPiece===10){
        let newStart = rotate_point(0,0,72*2,{...startPoint});
        let newCurrent = rotate_point(0,0,72*2,{...newPoint});
        let difX = newCurrent[0]-newStart[0];
        let turnDirection = difX>0?"":"'";
        if(Math.abs(difX)>.2){
            if(selectedSide==="blue") return "6"+turnDirection;
            else if(selectedSide==="pink") return "9"+turnDirection;
            else if(selectedSide==="yellow") return "10"+turnDirection;
            else if(selectedSide==="red") return "11"+turnDirection;
            else if(selectedSide==="green") return "12"+turnDirection;
            else if(selectedSide==="lightpurple") return "8"+turnDirection;

            else if(selectedSide==="lightblue") return "9"+turnDirection;
            else if(selectedSide==="lightbrown") return "6"+turnDirection;
            else if(selectedSide==="lightgreen") return "2"+turnDirection;
            else if(selectedSide==="orange") return "3"+turnDirection;
            else if(selectedSide==="purple") return "4"+turnDirection;
            else if(selectedSide==="white") return "5"+turnDirection;
        }
    }
    else if(selectedPiece===6){
        let newStart = rotate_point(0,0,72*3,{...startPoint});
        let newCurrent = rotate_point(0,0,72*3,{...newPoint});
        let difX = newCurrent[0]-newStart[0];
        let turnDirection = difX>0?"":"'";
        if(Math.abs(difX)>.2){
            console.log(difX);
            if(selectedSide==="blue")return "5"+turnDirection;
            else if(selectedSide==="pink") return "8"+turnDirection;
            else if(selectedSide==="yellow") return "9"+turnDirection;
            else if(selectedSide==="red") return "10"+turnDirection;
            else if(selectedSide==="green") return "11"+turnDirection;
            else if(selectedSide==="lightpurple") return "12"+turnDirection;

            else if(selectedSide==="lightblue") return "10"+turnDirection;
            else if(selectedSide==="lightbrown") return "2"+turnDirection;
            else if(selectedSide==="lightgreen") return "3"+turnDirection;
            else if(selectedSide==="orange") return "4"+turnDirection;
            else if(selectedSide==="purple") return "5"+turnDirection;
            else if(selectedSide==="white") return "6"+turnDirection;
        }
    }
    else if(selectedPiece===7){
        let newStart = rotate_point(0,0,72*4,{...startPoint});
        let newCurrent = rotate_point(0,0,72*4,{...newPoint});
        let difX = newCurrent[0]-newStart[0];
        let turnDirection = difX>0?"":"'";
        if(Math.abs(difX)>.2){
            if(selectedSide==="blue")return "4"+turnDirection;
            else if(selectedSide==="pink") return "6"+turnDirection;
            else if(selectedSide==="yellow") return "2"+turnDirection;
            else if(selectedSide==="red") return "3"+turnDirection;
            else if(selectedSide==="green") return "4"+turnDirection;
            else if(selectedSide==="lightpurple") return "5"+turnDirection;

            else if(selectedSide==="lightblue") return "11"+turnDirection;
            else if(selectedSide==="lightbrown") return "9"+turnDirection;
            else if(selectedSide==="lightgreen") return "10"+turnDirection;
            else if(selectedSide==="orange") return "11"+turnDirection;
            else if(selectedSide==="purple") return "12"+turnDirection;
            else if(selectedSide==="white") return "8"+turnDirection;
        }
    }

    // Click/Touch turns for corners
    else if (selectedPiece===3){
        let angle = Math.atan2((newPoint.y-startPoint.y),(newPoint.x-startPoint.x));
        let degrees = rToD(angle);
        let dist = Math.hypot(newPoint.x-startPoint.x, newPoint.y-startPoint.y)
        if(degrees<0) degrees = 360+degrees;
        if(touchedEdge||dist>.2){
            console.log(degrees)
            if(selectedSide==="blue"){
                if(degrees>=36&&degrees<126)return "4";
                if(degrees>=126&&degrees<216) return "3'";
                if(degrees>=216&&degrees<306) return "4'";
                if(degrees>=306||degrees<36) return "3";
            }
            if(selectedSide==="pink"){
                if(degrees>=36&&degrees<126)return "6";
                if(degrees>=126&&degrees<216) return "1'";
                if(degrees>=216&&degrees<306) return "6'";
                if(degrees>=306||degrees<36) return "1";
            }
            if(selectedSide==="yellow"){
                if(degrees>=36&&degrees<126)return "2";
                if(degrees>=126&&degrees<216) return "1'";
                if(degrees>=216&&degrees<306) return "2'";
                if(degrees>=306||degrees<36) return "1";
            }
            if(selectedSide==="red"){
                if(degrees>=36&&degrees<126)return "3";
                if(degrees>=126&&degrees<216) return "1'";
                if(degrees>=216&&degrees<306) return "3'";
                if(degrees>=306||degrees<36) return "1";
            }
            if(selectedSide==="green"){
                if(degrees>=36&&degrees<126)return "4";
                if(degrees>=126&&degrees<216) return "1'";
                if(degrees>=216&&degrees<306) return "4'";
                if(degrees>=306||degrees<36) return "1";
            }
            if(selectedSide==="lightpurple"){
                if(degrees>=36&&degrees<126)return "5";
                if(degrees>=126&&degrees<216) return "1'";
                if(degrees>=216&&degrees<306) return "5'";
                if(degrees>=306||degrees<36) return "1";
            }
            if(selectedSide==="lightblue"){
                if(degrees>=36&&degrees<126)return "11";
                if(degrees>=126&&degrees<216) return "12'";
                if(degrees>=216&&degrees<306) return "11'";
                if(degrees>=306||degrees<36) return "12";
            }
            if(selectedSide==="lightbrown"){
                if(degrees>=36&&degrees<126)return "9";
                if(degrees>=126&&degrees<216) return "7'";
                if(degrees>=216&&degrees<306) return "9'";
                if(degrees>=306||degrees<36) return "7";
            }
            if(selectedSide==="lightgreen"){
                if(degrees>=36&&degrees<126)return "10";
                if(degrees>=126&&degrees<216) return "7'";
                if(degrees>=216&&degrees<306) return "10'";
                if(degrees>=306||degrees<36) return "7";
            }
            if(selectedSide==="orange"){
                if(degrees>=36&&degrees<126)return "11";
                if(degrees>=126&&degrees<216) return "7'";
                if(degrees>=216&&degrees<306) return "11'";
                if(degrees>=306||degrees<36) return "7";
            }
            if(selectedSide==="purple"){
                if(degrees>=36&&degrees<126)return "12";
                if(degrees>=126&&degrees<216) return "7'";
                if(degrees>=216&&degrees<306) return "12'";
                if(degrees>=306||degrees<36) return "7";
            }
            if(selectedSide==="white"){
                if(degrees>=36&&degrees<126)return "8";
                if(degrees>=126&&degrees<216) return "7'";
                if(degrees>=216&&degrees<306) return "8'";
                if(degrees>=306||degrees<36) return "7";
            }
        }
    }
}

export default calculateTurn;
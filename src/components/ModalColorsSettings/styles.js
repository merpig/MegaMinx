import styled from 'styled-components';

// 
// Styles referenced from 
// https://github.com/AdeilsonESilva/MegaMinx/blob/main/src/components/ModalColorsSettings/styles.js
// Big thanks to https://github.com/AdeilsonESilva
//

export const ModalContainer = styled.div`
  width: 90%;
  max-width: 25rem;
  margin: auto;
  margin-top: 20px;
  border: 2px solid #007bff;
  border-radius: .25rem;
  color: #d3d3d3;
  padding: 4px;
  background-color: rgba(0,0,100,.8);
`;

export const DivButtonCloseModal = styled.div`
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  vertical-align: middle;
  line-height: 5vh;
  margin: 2px;
  border: 2px solid lightgray;
  pointer-events: auto;
  border-radius: .25rem;
  background-color: rgba(211,211,211,.1);
  transition: background-color .4s ease;

  &:hover{
      cursor: pointer;
      background-color: rgba(0, 0, 255,.5);
  }
`;

export const DivColorFace = styled.div`
  margin-bottom: 8px;
`;

export const DivModaContainer = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.7);

  z-index: 1000;
`;

export const DivModalBody = styled.div`
  position: relative;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0,0,0,.8);
  margin: 4px;
  border-radius: .25rem;
  padding: 4px;
`;

export const DivModalTable = styled.table`
  margin: auto;
  margin-top: 8px;
  margin-bottom: 8px;
`;
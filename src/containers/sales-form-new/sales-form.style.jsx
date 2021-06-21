import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0px;
  margin: 0px;
  position: relative;
`;

export const SectionContainer = styled.div`
  width: 100%;
  padding: 0px 10vw;
  margin: 50px 0px;

  @media only screen and (max-width: 900px) {
    padding: 0px 3vw;
  }
`;

export const ClientDetails = styled.div`
  width: 100%;
  border: 2px solid #ff6b6c;
  border-radius: 10px;
  padding: 35px;
  position: relative;

  @media only screen and (max-width: 900px) {
    padding: 25px 10px;
  }
`;

export const Title = styled.div`
  height: 30px;
  background-color: #ff6b6c;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  position: absolute;
  top: -15px;
  left: 25px;
`;

export const PropertyDetails = styled.div`
  width: 100%;
  border: 2px solid #ff6b6c;
  border-radius: 10px;
  padding: 35px;
  position: relative;

  @media only screen and (max-width: 900px) {
    padding: 25px 10px;
  }
`;

export const SelectOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  justify-items: center;

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
  }
`;

export const CinCoutContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;
  margin-top: 20px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const CinCoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5vw 0.5vw;
  font-size: 1vw;

  @media only screen and (max-width: 900px) {
    margin: 0.5vw 0.5vw;
    font-size: 1em;
  }
`;

export const CinCoutLabel = styled.label`
  margin: 0px;

  span {
    font-size: 1.2vw;
    color: #707070;
    margin: 0px;

    @media only screen and (max-width: 900px) {
      font-size: 4vw;
    }
  }
`;

export const DatePickerDiv = styled.div`
  text-align: center;
  border-bottom: 1.5px solid #ff6b6c;
  cursor: pointer;
  width: 10vw;
  height: 2vw;
  font-size: 0.9vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 5px;

  @media only screen and (max-width: 900px) {
    width: 38vw;
    height: 9vw;
    font-size: 3.5vw;
  }
`;

export const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  overflow: scroll;
  position: relative;
  padding: 15px 25px;

  @media only screen and (max-width: 900px) {
    padding: 15px 5px;
  }
`;

export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222222;
  border-top: 0.5px solid #707070;
  margin: 0px;
  padding: 5px 15px;

  &:last-child {
    border-bottom: 0.5px solid #707070;
  }

  @media only screen and (max-width: 900px) {
    padding: 15px 5px;
  }
`;

export const RoomType = styled.div`
  font-weight: 600;
  color: #ff6b6c;
`;

export const RoomSharing = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin: 15px 0px;
  font-size: 0.9em;

  @media only screen and (max-width: 900px) {
    grid-template-columns: 2fr 2fr;
  }
`;

export const SharingTitle = styled.div``;

export const SharingDetails = styled.div`
  span {
    color: #ff6b6c;
    font-size: 0.8em;
  }
`;

export const SharingPrice = styled.div``;

export const PlusMinus = styled.div`
  width: 150px;
  height: 40px;
  border-radius: 3px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6b6c;
  cursor: pointer;

  @media only screen and (max-width: 900px) {
    grid-column: 1 / span 2;
    width: 100%;
    margin-top: 10px;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;

    &:nth-child(2) {
      background-color: white;
      color: #ff6b6c;
      width: 34%;
    }
  }
`;

export const AddButton = styled.div`
  border-radius: 3px;
  background-color: ${(props) => (props.isMaxed ? "#707070" : "transparent")};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export const Plus = styled.span`
  border-radius: 0px 3px 3px 0px;
  background-color: ${(props) => (props.isMaxed ? "#707070" : "transparent")};
`;

export const PaymentDetails = styled.div`
  width: 100%;
  border: 2px solid #ff6b6c;
  border-radius: 10px;
  padding: 35px;
  position: relative;

  @media only screen and (max-width: 900px) {
    padding: 25px 10px;
  }
`;

export const GenerateBooking = styled.div`
  width: 100%;
  border: 2px solid #ff6b6c;
  border-radius: 10px;
  padding: 35px;
  position: relative;

  @media only screen and (max-width: 900px) {
    padding: 25px 10px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const FlexItem = styled.div`
  width: 100%;
  padding: 15px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;

  @media only screen and (max-width: 900px) {
    width: 100%100vh;
    padding: 15px 5px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }

  h2 {
    margin: 0px;
    padding: 0px;
    font-weight: 600;
    font-size: 1.2em;
  }
`;

export const Summary = styled.div`
  width: 80%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const PropertyTitle = styled.div`
  font-weight: 600;
  font-size: 1.4em;
`;

export const CheckInCheckOut = styled.div`
  margin: 5px 0px 10px 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  div {
    display: flex;
    flex-direction: column;
    color: #707070;
    font-size: 0.8em;

    span {
      color: #ff6b6c;
      font-weight: 600;
      font-size: 1.2em;
    }
  }
`;

export const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-areas:
    "image title"
    "image sharing";
  column-gap: 10px;
  margin-bottom: 20px;
  border: 1px solid #ff6b6c;
  padding: 5px;
  border-radius: 3px;

  @media only screen and (max-width: 450px) {
    grid-template-columns: 60px 1fr;
  }

  @media only screen and (max-width: 330px) {
    grid-template-columns: 50px 1fr;
  }
`;

export const Image = styled.img`
  grid-area: image;
  width: 100%;
  height: auto;
`;

export const CartSharingTitle = styled.div`
  grid-area: title;
  font-weight: 600;
`;

export const Sharing = styled.div`
  grid-area: sharing;
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
`;

export const SharingItem = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr 4fr;
  margin-top: 10px;
`;

export const CartSharingSharingTitle = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 0.8em;
    color: #ff6b6c;
  }
`;

export const SharingCount = styled.div`
  color: #707070;
`;

export const SharingTotal = styled.div`
  font-weight: 600;
`;

export const CartTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    display: flex;
    align-items: flex-end;
    margin-bottom: 5px;
    padding-right: 5px;

    span {
      width: 140px;
      text-align: right;
    }

    span:first-child {
    }
  }

  div:nth-child(4) {
    font-weight: 600;
    color: #ff6b6c;
  }
`;

export const Line = styled.div`
  width: 300px;
  border-bottom: 1px solid #cccccc;
`;

export const MealsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin: 5px 0px 0px 0px;
  font-size: 16px;

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const MealsItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MealsCost = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SelectAccount = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;

  span {
    width: 200px;
    margin-right: 25px;
    font-weight: 600;
    color: #ffffff;
    height: 40px;
    line-height: 40px;

    @media only screen and (max-width: 900px) {
      height: 30px;
      line-height: 30px;
    }
  }
`;

import styled from "styled-components/native";

import Colors from "../../../shared/utils/constants/Colors";
import Fonts from "../../utils/constants/Fonts";

export const StyledText = styled.Text`
    font-family: ${Fonts.Lato};
    margin-left: 10px;
    font-size: 13px;
    color: ${Colors.gray};
`;

export const StyledMainView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 8px 8px;
    border-bottom-color: ${Colors.lightGray};
    border-bottom-width: 1px;
`;

export const StyledTaskTitle = styled(StyledText)`
    font-size: 20px;
    color: ${Colors.lightBlack};
    margin-bottom: 5px;
    text-decoration: ${(props) => props.isCompleated ? "line-through" : "none" };
`;

export const StyledTextView = styled.View`
    min-width: 75%;
    max-width: 75%;
`;

export const StyledDatesTextView = styled.View`
    flex-direction: row;
`;
import styled from "styled-components";

interface FormProps {
  type: string;
  contents: string;
}

interface FormStyleProps {
  type: string;
}

const FormWrapper = styled.span<FormStyleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 0 2px;
  border-radius: 50%;

  background-color: ${(props) => {
    const type = props.type;
    let color = "";

    if (type === "W") {
      color = "#2b8a3e";
    }
    if (type === "D") {
      color = "#1864ab";
    }
    if (type === "L") {
      color = "#c92a2a";
    }

    return color;
  }};
`;

const Form: React.FC<FormProps> = ({ type, contents }) => {
  return <FormWrapper type={type}>{contents}</FormWrapper>;
};

export default Form;

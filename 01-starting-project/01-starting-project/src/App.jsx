import UserInput from "./components/UserInput.jsx";
import Result from "./components/Result.jsx";
import Input from "./components/Input.jsx";
import {useState} from "react";

const INPUT ={
    initialInvestment : 100000,
    annualInvestment : 1200,
    expectedReturn : 6,
    duration : 10
}
function App() {
    const [inputs, setInputs] = useState(INPUT);
    function handleInputValueChange(input, newValue){
        setInputs(prevInputs => {
            return{
                ...prevInputs,
                [input] : newValue
            };
        })
    }

    return (
      <main>
          <div id="user-input">
              <div className="input-group">
                  <Input label="INITIAL INVESTMENT" input="initialInvestment" initialValue={INPUT.initialInvestment} onChangeValue={handleInputValueChange}/>
                  <Input label="ANNUAL INVESTMENT" input="annualInvestment" initialValue={INPUT.annualInvestment} onChangeValue={handleInputValueChange}/>
              </div>
              <div className="input-group">
                  <Input label="EXPECTED RETURN" input="expectedReturn" initialValue={INPUT.expectedReturn} onChangeValue={handleInputValueChange}/>
                  <Input label="DURATION" input="duration" initialValue={INPUT.duration} onChangeValue={handleInputValueChange}/>
              </div>
          </div>
          {inputs.initialInvestment + inputs.annualInvestment}
        <Result />
      </main>
    )
}

export default App

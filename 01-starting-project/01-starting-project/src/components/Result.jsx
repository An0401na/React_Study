import {calculateInvestmentResults, formatter} from "../util/investment.js";

export default function Result({input}){
    console.log(input);
    const results = calculateInvestmentResults(input);
    console.log(results);
    let totalInterest = 0;
    let investedCapital = input.initialInvestment;
    return (
        <table id="result">
            <thead>
            <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capaital</th>
            </tr>
            </thead>
            <tbody>
            {results.map((result) => {
                totalInterest += result.interest;
                investedCapital += input.annualInvestment;
                return (
                    <tr key={result.year}>
                        <td>{result.year}</td>
                        <td>{formatter.format(result.valueEndOfYear)}</td>
                        <td>{formatter.format(result.interest)}</td>
                        <td>{formatter.format(totalInterest)}</td>
                        <td>{formatter.format(investedCapital)}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
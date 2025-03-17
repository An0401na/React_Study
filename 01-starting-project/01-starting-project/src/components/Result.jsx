import {calculateInvestmentResults, formatter} from "../util/investment.js";

export default function Result({input}){

    console.log(input); // input 값 확인을 위한 로그

    // input을 인자로 받아 투자 결과를 계산하는 함수 호출
    const results = calculateInvestmentResults(input);
    console.log(results); // 계산된 결과 확인을 위한 로그

    // 총 이자와 투자된 자본 변수 초기화
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
                {/* 계산된 결과를 반복문을 사용하여 테이블에 표시 */}
                {results.map((result) => {
                    // 매년 이자를 누적하여 totalInterest에 더함
                    totalInterest += result.interest;

                    // 매년 투자 금액을 누적하여 investedCapital에 더함
                    investedCapital += input.annualInvestment;

                    return (
                        /*
                          투자 결과 테이블의 각 행을 생성하는 부분
                          - 년도
                          - 년말 투자 금액
                          - 해당 년도의 이자
                          - 누적된 총 이자
                          - 누적된 투자 자본
                        */
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
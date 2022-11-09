import React,{useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'
function Calculator() {
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  const [error, setError] = useState('');
  const Navigate = useNavigate()
 
 
  function changehandel(e){
  const {name,value}=e.target;
  setUserValues({...userValues,[name]:value})
  console.log(userValues);
  }


      const{id}=useParams()
       const calculateResults = ({ amount, interest, years }) => {
        const userAmount = Number(amount);
        const calculatedInterest = Number(interest) / 100 / 12;
        const calculatedPayments = Number(years) * 12;
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (userAmount * x * calculatedInterest) / (x - 1);
        
        if (isFinite(monthly)) {
          const monthlyPaymentCalculated = monthly.toFixed(2);
          const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
          const totalInterestCalculated = (monthly * calculatedPayments - userAmount).toFixed(2);
      
          // Set up results to the state to be displayed to the user
          setResults({
            monthlyPayment: monthlyPaymentCalculated,
            totalPayment: totalPaymentCalculated,
            totalInterest: totalInterestCalculated,
            isResult: true,
          });
        }}
        const handleSubmitValues = (e) => {
          e.preventDefault();
              if (isValid()) {
            setError('');
            calculateResults(userValues);
          }
        };
        
        const isValid = () => {
          const { amount, interest, years } = userValues;
          let actualError = '';
          // Validate if there are values
          if (!amount || !interest || !years) {
            actualError = 'All the values are required';
          }
          // Validade if the values are numbers
          if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
            actualError = 'All the values must be a valid number';
          }
          // Validade if the values are positive numbers
          if (
            Number(amount) <= 0 ||
            Number(interest) <= 0 ||
            Number(years) <= 0
          ) {
            actualError = 'All the values must be a positive number';
          }
          if (actualError) {
            setError(actualError);
            return false;
          }
          return true;
        };

        const clearFields = () => {
          setUserValues({
            amount: '',
            interest: '',
            years: '',
          });
       
          setResults({
            monthlyPayment: '',
            totalPayment: '',
            totalInterest: '',
            isResult: false,
          });
        };


        function logout()
    {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_name')

    swal({
      title: "Success",
      text: "Logout Success",
      icon: "success",
      button: "Ok!",
    });
    Navigate('/');
  }
       
  return (
    <div className='container'>
      
      <form onSubmit={handleSubmitValues}>
      {!results.isResult ? (
          <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body text-center mt-5">
              
              <h1 className="heading display-5 pb-3">Loan Calculator</h1>
              <p>{error}</p>
              <div id="loan-form">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">$</span>
                    <input type="number" className="form-control" id="amount" placeholder="Loan Amount" name='amount' value={userValues.amount} onChange={changehandel}/>
                    
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">%</span>
                    <input type="number" className="form-control" id="interest" placeholder="Rate of interest" name='interest' value={userValues.interest} onChange={changehandel}/>
                  </div>
                </div>
                <div className="form-group">
                  <input type="number" className="form-control" id="years" placeholder="Years To Repay" name='years' value={userValues.years} onChange={changehandel}/>
                </div>
                <div className="form-group">
                  <input type="submit" Value="Calculate" className="btn btn-dark btn-block" />
                  <button className="btn btn-danger btn-block" onClick={logout}>Logout</button>
                </div>
              </div>
            </div>
            </div>
            </div>
        ) : (
          <div id="results" className="pt-4">
          <h5>Results</h5>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">Monthly Payment</span>
              <input type="number" className="form-control" id="monthly-payment" value={results.monthlyPayment} disabled />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">Total Payment</span>
              <input type="number" className="form-control" id="total-payment" value={results.totalPayment} disabled />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">Total Interest</span>
              <input type="number" className="form-control" id="total-interest" value={results.totalInterest} disabled />
              
            </div>
            <input value='Calculate again' type='button' className="btn btn-dark btn-block mt-4" onClick={clearFields}/>
            <button className="btn btn-danger btn-block mt-4" onClick={logout}>Logout</button>
          </div>
          
        </div>
        
        )}
        
      </form>
      
    </div>
    
  )
}

export default Calculator
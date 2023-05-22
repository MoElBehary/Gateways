import Gateway from './components/Gateway';
import CreateGatewayForm from './components/Gateway/CreateGatewayForm';
import CreatePeripheralForm from './components/Peripheral/CreatePeripheralForm';
import './App.css';
import { AppWrapper } from './model/Context/appContext';

function App() {
  return (
    <main className='p-4'>
      <AppWrapper>
        <header className='p-4'>
          <h2 className='text-center'> GateWays </h2>
        </header>
        < Gateway/>
        <CreateGatewayForm/>
        <CreatePeripheralForm />
      </AppWrapper>
    </main>
  );
}

export default App;

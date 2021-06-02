import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
import Coin from './Coin'
function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    )
      .then(res => {
        setCoins(res.data)
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })

  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filterCrypt = coins.filter(coin => { return coin.name.toLowerCase().includes(search.toLowerCase()) })


  return (
    <div className="App">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filterCrypt.map(coin => {
        return(
        <Coin
          key={coin.id}
          name={coin.name}
          price={coin.price}
          symbol={coin.price}
          marketcap={coin.total_volume}
          volume={coin.market_cap}
          image={coin.image}
          priceChange={coin.price_change_percentage_24h}
        />
      )})}
    </div>
  );
}

export default App;

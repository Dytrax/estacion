import React, { Component } from 'react'

export default class PostLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      login: false,
      //data:['data1','dato2','data3','dato4','data5','dato6']
      data: []
    };
  }
  fetchWithTimeOut(url, options, timeout = 100000) {
    return Promise.race([fetch(url, options), new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))]);
  }

  enviarFetch = async () => {
    //DDDhttps://estacion.herokuapp.com/api/data
    console.log('enviando fetch')
/*     const res = await fetch('http://localhost:3000/api/data')     
 */   try {


      const res = await this.fetchWithTimeOut('https://proyectofundamentos.herokuapp.com/api/data', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client: this.state.data.length
        })



      }, 172800000)


      console.log('Recibido1 fetch')
      const json = await res.json()

      console.log('success')
      this.setState({ data: json })


      console.log('Recibido2 fetch')
      console.log(res)
      console.log(json)

    } catch (e) {
      console.log(e)
      //alert(e)
    }
    this.enviarFetch()




    /* try{
    
      const query = await fetch("estacion.herokuapp.com/api/data" ,{  
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          
          })
          let responseJson = await query
          this.setState({data:responseJson})
          console.log(responseJson)
          //return [ query.status,responseJson]
  
      }catch(error){
        console.error(error)
      }  */
    /* fetch("estacion.herokuapp.com/api/data")
    .then((res) => {
      this.setState({data:res})
      
    }) */
  }
  componentDidMount() {

    this.enviarFetch()
  }


  render() {
    return (
      <div style={{ width: '100%' }}>
        <h3>Cantidad de datos recibidos: {this.state.data.length}</h3>
        
        <ul style={{ height: '500px', overflowY: 'scroll' }}>
          {this.state.data.reverse().map(
            (datoRecibidos, index) => {
              return (<li>
                {
                  
                  //JSON.stringify(datoRecibidos)
                  Object.keys(datoRecibidos).map((key) => {
                    return (
                      <div>
                        <h5><strong>{key}</strong></h5>
                        <h5>{JSON.stringify(datoRecibidos[key])}</h5>
                      </div>
                    )
                  })
                  
                }
              </li>)
            }

          )}
        </ul>

      </div>
    )
  }
}

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import './style.css'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PlaceIcon from '@material-ui/icons/Place'

import { KEY } from '../../secrets/googleMapsApi'
import { Divider } from '@material-ui/core'
import GoogleApiWrapper from '../GoogleApiWrapper/GoogleApiWrapper'

const pois = [
  {
    poiid: 1,
    title: 'Praça do Comércio',
    description: 'The Praça do Comércio (Portuguese pronunciation: [ˈpɾasɐ du kuˈmɛɾsju]; English: Commerce Square) is located in the city of Lisbon, Portugal. Situated near the Tagus river, the square is still commonly known as Terreiro do Paço ([tɨˈʁɐjɾu du ˈpasu]; English: Palace Yard),[1] because it was the location of the Paços da Ribeira (Royal Ribeira Palace) until it was destroyed by the great 1755 Lisbon earthquake. After the earthquake, the square was completely remodeled as part of the rebuilding of the Pombaline Downtown, ordered by Sebastião José de Carvalho e Melo, 1st Marquis of Pombal, who was the Minister of the Kingdom of Portugal from 1750 to 1777, during the reign of Dom José I, King of Portugal.[2]',
    lat: '38.7075293',
    lng: '-9.1365861',
    image: {
      imageid: 11,
      title: 'My Praça do Comércio',
      filePath: 'https://www.visitlisboa.com/sites/default/files/md-slider-image/2_33.jpg',
      private: false,
      datecreated: '2018-11-11'
    }
  },
  {
    poiid: 2,
    title: 'Ponte 25 de Abril',
    description: 'The 25 de Abril Bridge (Ponte 25 de Abril, 25th of April Bridge, Portuguese pronunciation: [ˈpõt(ɨ) ˈvĩt i ˈsĩku ðɨ ɐˈβɾiɫ]) is a suspension bridge connecting the city of Lisbon, capital of Portugal, to the municipality of Almada on the left (south) bank of the Tagus river. It was inaugurated on August 6, 1966, and a train platform was added in 1999. It is often compared to the Golden Gate Bridge in San Francisco, US, because they are both suspension bridges of similar color. It was built by the American Bridge Company which constructed the San Francisco–Oakland Bay Bridge, but not the Golden Gate. With a total length of 2,277 metres (7,470 ft), it is the 32nd largest suspension bridge in the world. The upper deck carries six car lanes, while the lower deck carries a double track railway electrified at 25 kV AC. Until 1974, the bridge was named Salazar Bridge. The name "25 de Abril" commemorates the Carnation Revolution.',
    lat: '38.6904756',
    lng: '-9.1773516',
    image: {
      imageid: 10,
      title: 'My Ponte 25 de Abril',
      filePath: 'https://www.bem-vindo-a-lisboa.com.br/wp-content/uploads/2017/07/tour-lisboa-belem-ponte-25-de-abril-e-cristo-rei-o-que-esperar-lisboa.jpg',
      private: false,
      datecreated: '2018-11-10'
    }
  },
  {
    poiid: 3,
    title: 'Torre de Belém',
    description: 'Belém Tower (Portuguese: Torre de Belém, pronounced [ˈtoʁ(ɨ) dɨ bɨˈlɐ̃ȷ̃]), or the "Tower of St Vincent",[1] is a fortified tower located in the civil parish of Santa Maria de Belém in the municipality of Lisbon, Portugal. It is a UNESCO World Heritage Site (along with the nearby Jerónimos Monastery)[2] because of the significant role it played in the Portuguese maritime discoveries of the era of the Age of Discoveries.[3] The tower was commissioned by King John II to be part of a defence system at the mouth of the Tagus river and a ceremonial gateway to Lisbon.[3]',
    lat: '38.6916389',
    lng: '-9.2158002',
    image: {
      imageid: 9,
      title: 'My PTorre de Belém',
      filePath: 'http://www.patrimoniocultural.gov.pt/static/data/cache/f8/72/f872e73eef92ad2d755293b95634a4a6.jpg',
      private: false,
      datecreated: '2018-11-09'
    }
  },
  {
    poiid: 4,
    title: 'Castelo de S. Jorge',
    description: 'São Jorge Castle (Portuguese: Castelo de São Jorge; Portuguese pronunciation: [kɐʃˈtɛlu dɨ sɐ̃w̃ ˈʒɔɾʒ(ɨ)]; Saint George Castle) is a Moorish castle occupying a commanding hilltop overlooking the historic centre of the Portuguese city of Lisbon and Tagus River. The strongly fortified citadel dates from medieval period of Portuguese history, and is one of the main tourist sites of Lisbon.',
    lat: '38.7075293',
    lng: '-9.1365861',
    image: {
      imageid: 8,
      title: 'My Castelo de S. Jorge',
      filePath: 'https://www.360meridianos.com/wp-content/uploads/2014/10/Castelo-de-São-Jorge-Lisboa.jpg',
      private: false,
      datecreated: '2018-11-08'
    }
  }
]

class MainPage extends Component {
  state = {
    center: {
      lat: 38.707738,
      lng: -9.132729
    },
    zoom: 11,
    clickedPoi: null,
    mapSize: 6
  }

  handleMap = () => {
    // this.setState({ mapSize: 9 })
  }

  handleClickOnPoi = clickedPoi => event => {
    this.setState({ clickedPoi })
  }

  render () {
    const { clickedPoi, mapSize } = this.state
    const poisMarkers = pois.map(poi => (
      <div
        lat={poi.lat}
        lng={poi.lng}
        className='marker'
        onClick={this.handleClickOnPoi(poi)}
      >
        {poi.title}
        <PlaceIcon />

      </div>
    ))

    return (
      <div className='root-main'>
        <Grid container>
          <Grid
            item
            md={6}
            xs={12}         
            className='grid-item'
            id='map'
          >
            <GoogleApiWrapper />
          </Grid>
          <Grid item md={6} xs={12} className='grid-item' id='desc'>
            <Paper>
              <div className='desc-paper'>
                <Typography component='h2' variant='headline' gutterBottom>
                  {!clickedPoi && 'Click poi'}
                  {clickedPoi && clickedPoi.title}
                </Typography>
                <Divider />
                <Typography variant='caption' gutterBottom align='center'>
                  Description:
                </Typography>
                <Typography gutterBottom noWrap className='text'>
                  {clickedPoi && clickedPoi.description}
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>

        <GridList className='gridList'>
          {pois.map(poi => (
            <GridListTile
              key={poi.poiid}
              className='my-col'
              onMouseEnter={this.handleClickOnPoi(poi)}
            >
              <img src={poi.image.filePath} alt={poi.title} className='col-img' />
              <GridListTileBar
                title={poi.title}
                className='titleBar'
                actionIcon={
                  <IconButton>
                    <StarBorderIcon className='title' />
                  </IconButton>
                }
              />
              <div
                className={
                  clickedPoi && clickedPoi.poiid === poi.poiid
                    ? 'overlay'
                    : 'shadow'
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <Grid container>
          <div>This is 3</div>
        </Grid>
      </div>
    )
  }
}

export default MainPage

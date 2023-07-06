// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startButton: false,
      setTimerLimitInMinutes: 25,
      setTimerLimitInSeconds: '00',
      timerLimitInMinutes: 25,
    }
  }

  onClickDecreaseTimeLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      setTimerLimitInSeconds: '00',
      setTimerLimitInMinutes: prevState.timerLimitInMinutes - 1,
    }))
  }

  onClickIncreaseTimeLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
      setTimerLimitInSeconds: '00',
      setTimerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  setTimerInToSeconds = () => {
    const {setTimerLimitInSeconds} = this.state
    if (setTimerLimitInSeconds === '00') {
      this.setState(prevState => ({
        setTimerLimitInMinutes: prevState.setTimerLimitInMinutes - 1,
        setTimerLimitInSeconds: 59,
      }))
      console.log('timer setup 59')
    }
  }

  timerInSeconds = () => {
    const {setTimerLimitInSeconds, setTimerLimitInMinutes} = this.state

    if (setTimerLimitInMinutes === '00' && setTimerLimitInSeconds === '00') {
      this.setState({startButton: false})
      clearInterval(this.timerID)
      console.log('timer over start button set to false')
    } else if (setTimerLimitInSeconds < 60 && setTimerLimitInSeconds > 10) {
      this.setState(prevState => ({
        setTimerLimitInSeconds: prevState.setTimerLimitInSeconds - 1,
      }))
      console.log('timer called below 59')
    } else if (setTimerLimitInSeconds > 0 && setTimerLimitInSeconds <= 10) {
      this.setState(prevState => ({
        setTimerLimitInSeconds: `0${prevState.setTimerLimitInSeconds - 1}`,
      }))
      console.log('timer called below 10 seconds')
    } else if (
      setTimerLimitInSeconds === '00' &&
      setTimerLimitInMinutes <= 10
    ) {
      this.setState(prevState => ({
        setTimerLimitInSeconds: 59,
        setTimerLimitInMinutes: `0${prevState.setTimerLimitInMinutes - 1}`,
      }))
    } else if (setTimerLimitInSeconds === '00') {
      this.setState(prevState => ({
        setTimerLimitInSeconds: 59,
        setTimerLimitInMinutes: prevState.setTimerLimitInMinutes - 1,
      }))
      console.log('timer set to 59 seconds')
    }
  }

  onClickStartButton = () => {
    const {startButton} = this.state
    this.setState(prevState => ({startButton: !prevState.startButton}))

    if (startButton === false) {
      this.setTimerInToSeconds()
      this.timerID = setInterval(this.timerInSeconds, 1000)
      console.log('timer called')
    } else {
      clearInterval(this.timerID)
      console.log('timer cleared')
    }
  }

  onClickResetButton = () => {
    const {startButton} = this.state
    this.setState({
      setTimerLimitInMinutes: 25,
      setTimerLimitInSeconds: '00',
      timerLimitInMinutes: 25,
    })
    clearInterval(this.timerID)
    if (startButton === true) {
      this.setState(prevState => ({startButton: !prevState.startButton}))
    }
  }

  render() {
    const {
      startButton,
      setTimerLimitInMinutes,
      setTimerLimitInSeconds,
      timerLimitInMinutes,
    } = this.state

    return (
      <div className="bg-container">
        <h1 className="heading"> Digital Timer </h1>

        <div className="inner-container">
          <div className="digital-counter-container">
            <div className="counter">
              <h1 className="time">
                {setTimerLimitInMinutes}:{setTimerLimitInSeconds}
              </h1>
              <p className="status"> {startButton ? 'Running' : 'Paused'} </p>
            </div>
          </div>

          <div className="button-container">
            <div className="start-reset-container">
              <div className="start">
                <button
                  type="button"
                  className="start-button"
                  onClick={this.onClickStartButton}
                >
                  <img
                    src={
                      startButton
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={startButton ? 'pause icon' : 'play icon'}
                    className="start-image"
                  />
                  {startButton ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="reset">
                <button
                  type="button"
                  className="reset-button"
                  onClick={this.onClickResetButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="reset-image"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="set-timer-limit"> Set Timer limit </p>
            <div className="time-setting-container">
              <button
                type="button"
                className="button"
                onClick={startButton ? null : this.onClickDecreaseTimeLimit}
              >
                -
              </button>
              <p className="time-text"> {timerLimitInMinutes} </p>
              <button
                type="button"
                className="button"
                onClick={startButton ? null : this.onClickIncreaseTimeLimit}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

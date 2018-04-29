// React core
import React, { Component } from 'react'

// Local functions
import { exists } from '../helpers/common_helpers'

// Local data
import Troops from '../data/troops'
import Vocab  from '../data/vocab.json'

// Local CSS
import '../stylesheets/components/TroopsViewer.css'

/*
**  Troops visualizer
*/

class TroopsViewer extends Component {

  // Class constructor
  constructor(props) {
    super(props)
    this.state = {
      troopIndexes: Object.keys(Troops).reduce((acc, key) => Object.assign(acc, {[key]: 0}), {})
    }
  }

  // Main render
  render() {
    return <div className="flex-col">
      {Object.entries(Troops).map(this.renderTroop)}
    </div>
  }

  // Render troop type category
  renderTroop = ([key, troop], idx) => {
    return <div key={`viewer-${key}-${idx}`}>
      <h3 className="troop-title">{troop.name}</h3>
      <div className="flex-row flex-middle cards-viewport">
        {Object.keys(troop.units).length > 0 && this.state.troopIndexes[key] > 0
          ? <button className="arrow-left" value="-1" data-troop-type={key} onClick={this.changeIndex}/>
          : <div className="arrow-spacer"/>
        }
        {Object.keys(troop.units).length > 0
          ? this.renderUnit(Object.entries(troop.units)[this.state.troopIndexes[key]])
          : <i>Aucune unité</i>
        }
        {Object.keys(troop.units).length > 0 && this.state.troopIndexes[key] < Object.keys(troop.units).length - 1
          ? <button className="arrow-right" value="1" data-troop-type={key} onClick={this.changeIndex}/>
          : <div className="arrow-spacer"/>
        }
      </div>
    </div>
  }

  // Render single unit card
  renderUnit = ([key, troop]) => {
    return <div className="unit-card flex-col">
      <h4>{troop.name}</h4>
      {this.renderStats(key, troop)}
      <div className="unit-desc">{troop.description.map(x => <p>{x}</p>)}</div>
      <table>
        <tbody>
          {Object.entries(troop.efficiency).sort(this.sortEff).map(([k, val]) => {
            const eff = (val > 100 ? '+' : '') + (val - 100) + '%'
            const cls = val > 100 ? "pos" : "neg"
            return val !== 100 && <tr key={`eff-${key}-${k}`} className={`eff-${cls}`}>
              <td>{Troops[k].name}</td>
              <td>{eff}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  }

  // Render unit stats in table
  renderStats = (key, troop) => {
    return <div className="troop-stats flex-row">
      {Object.entries(Vocab.stats).map(([k, stat], idx) => {
        const width = (troop.stats[k] / 110) * 100
        const numZero = <span className="num-zero">0</span>
        return <div className="flex-col troop-stat-single">
          <label>{stat}</label>
          <div className="flex-row">
            <div className="troop-stat-value">
              {troop.stats[k] < 100 && numZero}
              {troop.stats[k] < 10 && numZero}
              {troop.stats[k]}
            </div>
            <div className="stat-bar flex-row flex-stretch">
              <p style={{width: `${width}%`}}/>
            </div>
          </div>
        </div>
      })}
    </div>
  }

  // Sort by efficiency level
  sortEff = ([k1, v1], [k2, v2]) => (v1 < v2 ? 1 : -1)

  // Change index
  changeIndex = (event) => {
    const k = event.target.dataset.troopType
    const v = parseInt(event.target.value, 10)
    if (!isNaN(v) && exists(k)) {
      const newIndex = (this.state.troopIndexes[k] + v) >= Object.keys(Troops[k].units).length
        ? 0
        : (this.state.troopIndexes[k] + v < 0
          ? (Object.keys(Troops[k].units).length - 1)
          : this.state.troopIndexes[k] + v
        )
      this.setState({
        troopIndexes: Object.assign(this.state.troopIndexes, { [k]: newIndex })
      })
    }
  }
}

export default TroopsViewer

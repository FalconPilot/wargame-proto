// React core
import React, { Component } from 'react'

// Local data
import Troops from '../data/troops'
import Stats  from '../data/stats.json'

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
          ? <button className="arrow-left"/>
          : null
        }
        {Object.keys(troop.units).length > 0
          ? this.renderUnit(Object.entries(troop.units)[this.state.troopIndexes[key]])
          : <i>Aucune unité</i>
        }
        {Object.keys(troop.units).length > 0 && this.state.troopIndexes[key] < Object.keys(troop.units).length
          ? <button className="arrow-left"/>
          : null
        }
      </div>
    </div>
  }

  // Render single unit card
  renderUnit = ([key, troop]) => {
    return <div className="unit-card flex-col">
      <h4>{troop.name}</h4>
      {this.renderStats(key, troop)}
      <ul>
        {Object.entries(troop.efficiency).map(([k, val]) => {
          const eff = (val > 100 ? '+' : '') + (val - 100) + '%'
          const cls = val > 100 ? "pos" : "neg"
          return val !== 100 && <li key={`eff-${key}-${k}`} className={`eff-${cls}`}>
            {`${Troops[k].name} ${eff}`}
          </li>
        })}
      </ul>
    </div>
  }

  // Render unit stats in table
  renderStats = (key, troop) => {
    return <table className="troop-stats">
      <thead>
        <tr>
          {Object.values(Stats).map((stat, idx) => <th key={`st-h-${key}-${idx}`}>{stat}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.keys(Stats).map((k, idx) => {
            const width = (troop.stats[k] / 110) * 100
            return <td key={`stat-${k}-${key}-${idx}`}>
              <div className="flex-row">
                <div>{troop.stats[k]}</div>
                <div className="stat-bar flex-row flex-stretch">
                  <p style={{width: `${width}%`}}/>
                </div>
              </div>
            </td>
          })}
        </tr>
      </tbody>
    </table>
  }
}

export default TroopsViewer

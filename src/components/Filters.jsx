// import { useState, useEffect } from "react"
import propTypes from "prop-types"

import categories from "../constants/categories"

const Filters = ({ filter, setFilter }) => {
  return (
    <div className='filtros sombra contenedor'>
      <form>
        <div className='campo'>
          <label htmlFor='filters'>
            Mostrar
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
              id='filters'
            >
              <option value=''>Todo</option>
              {Object.entries(categories).map((category, i) => {
                return (
                  <option key={`category-filters-${i}`} value={category[0]}>
                    {category[1]}
                  </option>
                )
              })}
            </select>
          </label>
        </div>
      </form>
    </div>
  )
}

export default Filters

Filters.propTypes = {
  filter: propTypes.string.isRequired,
  setFilter: propTypes.func.isRequired,
}

import React from 'react';
import { Link } from 'react-router-dom'

class CategoryIndex extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        active: false
      }
    }


    render(){

      
        const getListingsByCategory = this.props.getListingsByCategory

        return <ul className="categories-wrapper">
            <li className={this.state.active ? 'highlight' : null }>
              <Link onClick={() => {getListingsByCategory(1); } } to={"/categories/1"}>
                Sofa & Sectional
              </Link>
            </li>
            <li className={this.state.active ? 'highlight' : null }>
            <Link onClick={() => { getListingsByCategory(2); }} to={"/categories/2"}>
                Seating
              </Link>
            </li>
            <li className={this.state.active ? 'highlight' : null }>
            <Link onClick={() => { getListingsByCategory(3); }} to={"/categories/3"}>
                Bedroom
              </Link>
            </li>
            <li className={this.state.active ? 'highlight' : null }>
            <Link onClick={() => { getListingsByCategory(4); }} to={"/categories/4"}>
                Console & Cabinet
              </Link>
            </li>
            <li className={this.state.active ? 'highlight' : null }>
            <Link onClick={() => { getListingsByCategory(5); }} to={"/categories/5"}>
                    Dining
                </Link>
            </li>
            <li className={this.state.active ? 'highlight' : null }>
                <Link onClick={() => {getListingsByCategory(6); }} to={"/categories/6"}>
                    Outdoor
                </Link>
            </li>
            <li className={this.state.active ? 'highlight' : null }>
                <Link onClick={() => {getListingsByCategory(7); }} to={"/categories/7"}>
                    Miscellaneous
                </Link>
            </li>

          <li className={this.state.active ? 'highlight' : null}>
              <Link onClick={() => {getListingsByCategory(8); }} to={"/categories/8"}>
                Special
              </Link>
            </li>
          </ul>;
    }
}

export default CategoryIndex;
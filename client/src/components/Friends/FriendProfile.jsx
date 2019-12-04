import React, { Component } from 'react'
import AuthService from '../Auth/AuthService'

export default class Friend extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = {
      friend: {}
    }
  }

  componentDidMount(){
    console.log(this.props.match)
  }

  loadProfile = () => {
    console.log(this.props)
  }


  render() {
    return (
      <main>
        
        {/* {this.loadProfile()} */}


        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo pariatur aspernatur aliquid quo consectetur deserunt perferendis, accusamus nisi at rem velit quam hic eius temporibus, eaque laudantium iste beatae rerum sequi deleniti! Reiciendis reprehenderit quam officia repellat totam veniam neque, quidem minima incidunt natus et enim unde quisquam rerum ipsa facere earum libero beatae. Fugit esse porro ad rerum architecto recusandae, minima quae vel eaque reiciendis aspernatur id numquam similique, pariatur neque doloribus distinctio excepturi accusantium nemo! Ab aut dolorem facere, voluptas rerum maiores! Suscipit corporis eum culpa velit! Dolorum veritatis in possimus, tempore minima qui dolor iusto ut ratione accusantium accusamus pariatur veniam quam eum deleniti id ea asperiores quidem atque ipsam. Libero natus voluptate explicabo recusandae ipsam modi.





        <h3>FRIENDS PROFILE</h3>
      </main>
    )
  }
}

import React ,{Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { creatTodoActions,getTasks,getTotal,getItemNo} from '../components/tododucks';
import './cartItem.css';
import {
Card
} from "reactstrap";
export class Item extends Component {
  constructor(props) 
  {
    super(props);
    this.props.addTodo();
    this.state = {
      isCartVisible:true
    };
     this.removeProduct = this.removeProduct.bind(this);
     this.subtractProduct = this.subtractProduct.bind(this);
     this.addProduct = this.addProduct.bind(this);
  }


  toggleCart=()=>{
   this.setState(prevState => ({
  isCartVisible: !prevState.isCartVisible
  }));
  }

  removeProduct(index,cardData){
     cardData.splice(index, 1);
    this.props.updateChartData(cardData);
  }
  addProduct(index,cardData){
     cardData[index].quantity = cardData[index].quantity +1;
    this.props.updateChartData(cardData);
  }
 subtractProduct(index,cardData){
   if(cardData[index].quantity >0){
     cardData[index].quantity = cardData[index].quantity - 1;
    this.props.updateChartData(cardData);
   }

  }
   render(){ 
    const cartData = this.props.IsTasks;
    const total = this.props.total;
    const totalNo= this.props.itemNo;
   return(<>
    <nav>
  <div class="container " onClick={this.toggleCart}>
  <div className="headerDiv" >     <div class = "blocks"><i class="fa fa-shopping-cart carticon"></i>
  {totalNo} Items {!this.state.isCartVisible && <i class="fa fa-sort-desc" aria-hidden="true"></i> }
  {this.state.isCartVisible && <i class="fa fa-sort-asc" aria-hidden="true"></i>}</div>
   <div class = "blocks">     $ {total}</div></div>
  </div> 
</nav>
{this.state.isCartVisible && <div class="container">
       { cartData?.length && cartData.map((task,index) => {
           return ( <div className="cardBody">
              {task.quantity>0 && <Card body>
               <div class="Cart-Items">
               <div onClick={()=>this.removeProduct(index,cartData)}><i class="fa fa-close"></i> </div>
 <div class="about">
 <h1 class="title">{task.title}</h1>
 <h3 class="subtitle">{task.desc}</h3>
 </div>
 <div class="counter">
  <div class="btn"  onClick={()=>this.addProduct(index,cartData)}>+</div>
 <div class="count" >{task.quantity}</div>
 <div class="btn"  onClick={()=>this.subtractProduct(index,cartData)}>-</div></div>
 <div class="prices">
  <div class="amount">{ task.currency} {Number(task.price)}</div></div>
 </div>
                 </Card>}
               </div>)    }
   )}
  </div>
   }
</>
);
}
}
  export default compose(
    connect(
      state => ({
        IsTasks: getTasks(state),
        total: getTotal(state),
        itemNo:getItemNo(state)
    }),
        { ...creatTodoActions }
    )
  )(Item);
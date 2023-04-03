
const Product = (props) => {
    const product = props.product
    const setSelectedCallback = props.setSelectedCallback
    const setEditCallback = props.setEditCallback;
    const setDeleteCallback = props.setDeleteCallback;
    return (
        <div id="singleTask" key={product._id}>
            <div id="doneOrNot">
                <button className={product.status ? "done" : "notDone"}
                    id="circle" onClick={setSelectedCallback}>
                </button>
            </div>
            <h3 style={product.status ? { textDecorationLine: 'line-through' } : {}}>{product.title} - {product.quantity} {product.unit}</h3>
            <button id="editButton" onClick={setEditCallback}>
                <span className="glyphicon glyphicon-edit"></span>
            </button>
            <button onClick={setDeleteCallback}><i className="fa fa-trash-o"></i></button>
            {product.comment.split("").length > 0 ? <p id="comment" style={product.status ? { textDecorationLine: 'line-through' } : {}}>
                <img src="./comment.png" ></img>{product.comment}
            </p> : null}
        </div>
    );
}

export default Product;

export const DescriptionModal = ({ description ,index}) => {
    return (
        <>
            <input type="checkbox" id={index} className="modal-toggle" />
            <div className="modal" role="dialog" id="my_modal_8">
                <div className="modal-box">
                    <p className="font-semibold text-3xl text-center">Description</p>
                    <br />
                    <div>

                        <p>
                            {description}
                        </p>
                    </div>


                    <div className="modal-action">
                        <div  onClick={()=>document.getElementById(index).checked=false} className="btn">Close</div>
                    </div>
                </div>
            </div>
        </>

    )
}

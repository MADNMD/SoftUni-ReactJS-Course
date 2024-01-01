import { useForm } from '../../../hooks/useForm';

export const AddComment = ({
    onSubmitComment
}) => {

    const {values, changeHandler, onSubmit} = useForm({
        comment: ''
    }, onSubmitComment);

    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={onSubmit}>
                <textarea
                    name="comment"
                    placeholder="Comment......"
                    value={values.comment}
                    onChange={changeHandler}
                ></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    )
}
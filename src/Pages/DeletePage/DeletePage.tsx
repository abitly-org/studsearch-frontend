import React, {useState} from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useSession from "../../Helpers/session";
import './deletePage.scss';

function DeletePage() {
    const [deleted, setDeleted] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const DeletedPage = (
        <div className={`DeletePageDone`}>
            <p>Твій обліковий запис успішно видаленний</p>
            <span>Якщо ти видалив свій обліковий запис випадково, ти можешь зареєструватись знову прямо зараз!</span>
            <Button to='/register' children={`Зареєструватись`}/>
        </div>
    );

    const session = useSession();
    if (session.loading) 
        return <LoadingSpinner center />;


    return (
        <div className={`DeletePageContainer`}>
            {deleted
                ? 
                DeletedPage
                :
                <div className={`DeletePage`}>
                    <h2>Ти точно хочешь видалити свій профіль?</h2>
                    <p>Час прощатися? Ми вже сумуємо за тобою! Ось що відбувається після видалення облікового запису:</p>
                    <p>Усі твої особисті дані зітруться. Ми продовжимо зберігати твою історію взаємодиії з нашім сайтом,
                        враховуючі нашу <Link to="/privacy-policy">политіку конфіденційності</Link> та з інших правових підстав</p>
                    <p>Просто знай, що ти завжди можеш повернутися, щоб надати слушну пораду абітурієнтам.</p>
                    <div className={`QuestionBlock`}>
                        <span>Запитання?</span>
                        <span>Контактні дані:</span>
                    </div>
                    <span><a href="https://t.me/dkaraush">@dkaraush</a></span>
                    <span>studsearch.info@gmail.com</span>
                    {
                        deleting ? 
                            <LoadingSpinner center-x /> : (
                                session.verified ? 
                                    <div className={`ButtonBlock`}>
                                        <Button children="Видалити обліковий запис" onClick={() => {
                                            if (deleting)
                                                return;
                                            setDeleting(true);
                                            session.delete()
                                                .then(() => {
                                                    setDeleting(false);
                                                    setDeleted(true);
                                                });
                                        }}/>
                                    </div>
                                    :
                                    <div className={`ButtonBlock`}>
                                        <p><b>Для видалення акаунту спочатку увійдіть у нього.</b></p>
                                    </div>
                            )
                    }
                </div>
            }
        </div>
    );
}

export default DeletePage;

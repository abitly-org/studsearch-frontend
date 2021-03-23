import React, {useState} from "react";
import Button from "../../Components/Button";
import './deletePage.scss';

function DeletePage() {
    const [ deleted, setDeleted] = useState(false);

    function DeletePage(e: any) {
        setDeleted(true)
    }
    const DeletedPage = <div className={`DeletePageDone`}>
        <p>Твій обліковий запис успішно видаленний</p>
        <span>Якщо ти видалив свій обліковий запис випадково, ти можешь зареєструватись знову прямо зараз!</span>
        <Button to='/sign-up' children={`Зареєструватись`}/>
    </div>

    return (
        <div className={`DeletePageContainer`}>
            {deleted? DeletedPage: <div className={`DeletePage`}>
                <h2>Ти точно хочешь видалити свій профіль?</h2>
                <p>Час прощатися? Ми вже сумуємо за тобою! Ось що відбувається після видалення облікового запису:</p>
                <p>Усі твої особисті дані зітруться. Ми продовжимо зберігати твою історію взаємодиії з нашім сайтом,
                    враховуючі нашу политіку конфіденційності та з інших правових підстав</p>
                <p>Просто знай, що ти завжди можеш повернутися, щоб надати слушну пораду абітурієнтам.</p>
                <div className={`QuestionBlock`}>
                    <span>Запитання?</span>
                    <span>Контактні дані:</span>
                </div>
                <span>@dkaraush</span>
                <span>studsearch.info@gmail.com</span>
                <div className={`ButtonBlock`}>
                    <Button children="Видалити обліковий запис" onClick={DeletePage}/>
                </div>
            </div> }
        </div>
    );
}

export default DeletePage;

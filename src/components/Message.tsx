import './Message.css';

type MessageProps = {

    texto: string;

    tipo?: 'error' | 'success' | 'warning';

};

const Message: React.FC<MessageProps> = ({
    texto,
    tipo = 'error'
}) => {

    return (

        <div className={`mensaje mensaje-${tipo}`}>

            {texto}

        </div>

    );

};

export default Message;
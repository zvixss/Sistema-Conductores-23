import {IonRouterLink,
} from '@ionic/react';

import './Button.css';

type ButtonLinkProps = {
    texto: string;

    routerLink?: string;

    fontSize?: string;

    fontFamily?: string;

    textColor?: string;

    onClick?: () => void;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
    texto,
    routerLink,
    fontSize,
    fontFamily,
    textColor = '#0D678E',
    onClick,
}) => {
    return (

        <IonRouterLink

            className="boton-link-principal"

            style={{fontSize: fontSize,
                    fontFamily: fontFamily,
                    color: textColor} as React.CSSProperties}

            routerLink={routerLink}

            onClick={onClick}

        >

            {texto}

        </IonRouterLink>

    );

};

export default ButtonLink;

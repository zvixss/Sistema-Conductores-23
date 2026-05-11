import {IonButton,
    IonIcon
} from '@ionic/react';

import './Button.css';

type ButtonProps = {
    texto: string;

    talla?: 'small' | 'default' | 'large';

    ancho?: string;

    expand?: 'block' | 'full';

    routerLink?: string;

    disabled?: boolean;

    icono?: any;

    background?: string;

    fontSize?: string;

    fontFamily?: string;

    textColor?: string;

    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
    texto,
    talla = 'default',
    ancho = '100%',
    expand,
    routerLink,
    disabled = false,
    icono,
    background,
    fontSize,
    fontFamily,
    textColor = '#0D678E',
    onClick,
}) => {
    return (

        <IonButton

            className="boton-principal"

            size={talla}

            style={{width: ancho,
                    '--background': background,
                    'font-size': fontSize,
                    'font-family': fontFamily,
                    '--color': textColor} as React.CSSProperties}

            expand={expand}

            routerLink={routerLink}

            disabled={disabled}

            onClick={onClick}

        >

            {icono && (<IonIcon icon={icono} slot="start"/>)}

            {texto}

        </IonButton>

    );

};

export default Button;

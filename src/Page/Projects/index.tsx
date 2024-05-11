
import { Link } from 'react-router-dom';
import styles from './index.module.scss'
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export const Projects = () => {
    const [show, setShow] = useState(false);
    const projects = {
        'in3': { name: 'in3', img: '/projectImg/in3.png', link: '/projects/in3' },
        '': {},
        '': {},
        '': {}
    };

    return (
        <>
            {(!show) && (
                <div className={styles.outContainer}>
                    {[0, 1, 2].map((index) => (
                        <div className={styles.flexContainer}>
                            {[0, 1, 2, 4].map((item, index) => (
                                <Link
                                    to={projects.in3.link}
                                    key={index}
                                    className={styles.item}
                                    onClick={() => { setShow(true); console.log(index, show); }}
                                >
                                    <div className={styles.pImage}>
                                        <img src={projects.in3.img} />
                                    </div>
                                    <div className={styles.pText}>{projects.in3.name}</div>
                                </Link>
                            ))}
                        </div>

                    ))}
                </div>
            ) ||
                (show) && (<>
                    <Outlet />
                </>)}

        </>
    );
}

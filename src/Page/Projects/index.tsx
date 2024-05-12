
import { Link } from 'react-router-dom';
import styles from './index.module.scss'
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export const Projects = () => {
    const [show, setShow] = useState(false);
    const projects = [
        { name: 'in3', img: '/projectImg/in3.png', link: '/projects/in3' },
        { name: 'threeDCharacter', img: '/projectImg/threeDCharacter.png', link: '/projects/threedcharacter' },
        { name: 'carCar', img: '/projectImg/carCar.png', link: '/projects/car' },
        { name: 'aiGallery', img: '/projectImg/aiGallery.png', link: '/projects/aiGallery' },

    ]

    return (
        <>
            {(!show) && (
                <div className={styles.outContainer}>
                    {/* {[0, 1, 2].map((index) => ( */}
                    <div className={styles.flexContainer}>
                        {projects.map((item, index) => (
                            <Link
                                to={projects[index].link}
                                key={index}
                                className={styles.item}
                                onClick={() => { setShow(true); console.log(index, show); }}
                            >
                                <div className={styles.pImage}>
                                    <img src={projects[index].img} />
                                </div>
                                <div className={styles.pText}>{projects[index].name}</div>
                            </Link>
                        ))}
                    </div>

                    {/* ))} */}
                </div>
            ) ||
                (show) && (<>
                    <Outlet />
                </>)}

        </>
    );
}

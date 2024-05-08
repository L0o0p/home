import { useState } from 'react';
import styles from './index.module.scss';

export const NavBar = () => {
    const tabsX = ['Avatar', 'Home', 'Projects'];
    const tabsY = ['Login', 'Setting'];
    const [activeTabIndex, setActiveTabIndex] = useState(-1);

    const handleClick = (index: number) => {
        setActiveTabIndex(index);
        console.log('clicked the tab', index);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.tabs}>
                    {tabsX.map((tab, index) => (
                        <div
                            key={tab}
                            className={`${styles.tab} ${index === activeTabIndex ? styles.active : ''}`}
                            onClick={() => handleClick(index)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <div className={styles.tabs}>
                    <div className={styles.divider}>|</div>
                    <div className={styles.tabs}>
                        {tabsY.map(tab => (
                            <div
                                key={tab}
                                className={styles.tabY}  // 添加新类名
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div>1</div>
        </div>
    );
};
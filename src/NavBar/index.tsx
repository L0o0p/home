import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    const tabsX = ['Avatar', 'Home', 'Projects', 'Chat'];
    const tabsY = ['Login', 'Setting'];
    const [activeTabIndex, setActiveTabIndex] = useState(-1);

    // 在组件加载时，尝试从 LocalStorage 获取之前保存的标签索引
    useEffect(() => {
        const savedIndex = localStorage.getItem('activeTabIndex');
        if (savedIndex) {
            setActiveTabIndex(parseInt(savedIndex));
        }
    }, []);

    const handleClick = (index: number) => {
        setActiveTabIndex(index);
        localStorage.setItem('activeTabIndex', index.toString()); // 保存索引到 LocalStorage
        console.log('clicked the tab', index);
    };

    return (

        <div className={styles.navContainer}>
            <div className={styles.tabs}>
                {tabsX.map((tab, index) => (
                    <Link
                        key={tab}
                        to={`/${tab.toLowerCase()}`}
                        className={`${styles.tab} ${index === activeTabIndex ? styles.active : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        {tab}
                    </Link>
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
    );
};
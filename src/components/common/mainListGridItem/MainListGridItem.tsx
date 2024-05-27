import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { memo } from 'react';
import { MenuDotsIcon } from '../../icons';
import ElementLoading from '../elementLoading/ElementLoading';
import styles from "./mainListGridItem.module.css";


interface MainListGridItemProps {
    id?: number | null,
    title: string,
    caption: string | string[],
    isActive: boolean
    endElem?: React.ReactNode,
    status?: string,
    onPress?: (id: number | null) => void,
    isMenu?: boolean,
    deleteData?: (id: number | null) => void,
    editData?: (id: number | null) => void
}

const MainListGridItem: React.FC<MainListGridItemProps> = ({
    id,
    title,
    caption,
    isActive,
    endElem,
    status,
    onPress = () => { },
    isMenu = false,
    deleteData = () => { },
    editData = () => { }
}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = (id: number | null) => {
        setAnchorEl(null);
        editData(id || null)
    }
    return (
        <div
            onClick={() => onPress(id || null)}
            className={[styles.mainListGridItem].join(' ')}
            style={isActive ? { backgroundColor: "#ECF2FF" } : { backgroundColor: "#F4F6F7" }}
        >
            <div className={styles.mainListGridItemBody}>
                <p className={styles.boxItemTitle}>
                    {title.length > 30 ? `${title.substring(0, 30)}...` : title}
                </p>
                {typeof caption === 'string' ? (
                    <p className={styles.boxItemCaption}>
                        {caption}
                    </p>
                ) : (
                    caption.map((item, index) => (
                        <p key={index} className={styles.boxItemCaption}>
                            {item}
                        </p>
                    ))
                )}

            </div>
            <ElementLoading skeletonElement={<>...</>}>
                {
                    isMenu ? (
                        <>
                            <div className={styles.boxItemTwo}>
                                <IconButton
                                    id="demo-positioned-button"
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MenuDotsIcon />
                                </IconButton>

                            </div>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={() => handleEdit(id || null)}>Tahrirlash</MenuItem>
                                {/* <MenuItem onClick={() => deleteData(id || null)}>O'chirish</MenuItem> */}
                            </Menu>
                        </>
                    ) : endElem ? (
                        <div className={styles.boxItemTwo}>
                            {endElem}
                        </div>
                    ) : (
                        <div className={styles.boxItemOne}>
                            {status}
                        </div>
                    )
                }
            </ElementLoading>
        </div>
    );
};

export default memo(MainListGridItem);
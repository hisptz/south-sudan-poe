import { Layer, Popper, FlyoutMenu, MenuItem, IconChevronDown16 } from '@dhis2/ui'
import { useRef, useState } from 'react'


function Dropdown(args: any) {

    const ref = useRef<HTMLButtonElement | any>()
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open);

    return (
        <>
            <button ref={ref} onClick={toggle}>
                Choose language &nbsp;&nbsp; <IconChevronDown16 />
            </button>
            {open && (
                <Layer onClick={toggle}>
                    <Popper reference={ref} placement="bottom-start">
                        <FlyoutMenu {...args}>
                            <MenuItem label="English" />
                            <MenuItem label="Swahili" />
                        </FlyoutMenu>
                    </Popper>
                </Layer>
            )}
        </>
    )
}

export default Dropdown;
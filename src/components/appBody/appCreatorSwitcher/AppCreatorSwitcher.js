import './appCreatorSwitcher.css';

const AppCreatorSwitcher = ({creatorSwitcher, setNewSwitcher}) => {
    return(
        <div
            className="app-creator-switcher"
            onClick={() => setNewSwitcher()}>
            <p>
                Let's create with {creatorSwitcher}
            </p>
        </div>
    )
}

export default AppCreatorSwitcher;
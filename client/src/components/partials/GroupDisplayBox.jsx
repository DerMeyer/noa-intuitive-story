import React, { Component } from 'react';
import { SoulNames, SoulNamesTranslation } from '../../js/enums';
import '../../css/groupDisplayBox.css';

const createSoulDisplay = (soulNameTranslation, style) => {
    const soulKey = Object.keys(SoulNamesTranslation).reduce((acc, key) => {
        if (SoulNamesTranslation[key] === soulNameTranslation) {
            acc = key;
        }
        return acc;
    }, '');
    const soulName = SoulNames[soulKey];
    if (!soulName) {
        return <div className="soul-display" />;
    }
    return (
        <div className="soul-display" style={style}>
            <img
                className="group-display-box-soul-gif"
                src={`/images/${soulName}.gif`}
                alt=""
            />
        </div>
    );
};

const createCharacterDisplay = (characterName, style) => (
    <div className="character-display" style={style}>
        <div className="character-name">
            {characterName}
        </div>
    </div>
);


class GroupDisplayBox extends Component {
    render() {
        const rows = [];
        Object.keys(SoulNamesTranslation).forEach(soulKey => {
            const row = {};
            const soulName = SoulNamesTranslation[soulKey];
            row.soul = soulName;
            if (this.props[soulName]) {
                row.role = this.props[soulName].role;
                row.character = this.props[soulName].character;
            }
            rows.push(row);
        });
        return (
            <div className="group-display-box" style={this.props.style}>
                {rows.map((row, index) => {
                    const borderStyle = index === rows.length - 1
                        ? { borderBottom: 'none' }
                        : {};
                    return (
                        <div
                            className="group-display-box-row"
                            key={`group-display-box-row-${index}`}
                        >
                            {createSoulDisplay(row.soul, { ...borderStyle })}
                            {createSoulDisplay(row.role, { left: '10%', ...borderStyle })}
                            {createCharacterDisplay(row.character, { left: '20%', ...borderStyle })}
                        </div>
                    );
                })}
                {/*{souls.map((soul, index) => {
                    const key = `group-display-box-soul-${index}`;
                    const style = {
                        top: `${index * 20.1}%`
                    };
                    return createSoulDisplay(soul, key, style);
                })}
                {roles.map((role, index) => {
                    const key = `group-display-box-role-${index}`;
                    const style = {
                        left: '10%',
                        top: `${index * 20.1}%`
                    };
                    return createSoulDisplay(role, key, style);
                })}
                {characters.map((character, index) => {
                    const key = `group-display-box-character-${index}`;
                    const style = {
                        left: '20%',
                        top: `${index * 20.1}%`
                    };
                    return createCharacterDisplay(character, key, style);
                })}*/}
            </div>
        );
    }
}

export default GroupDisplayBox;
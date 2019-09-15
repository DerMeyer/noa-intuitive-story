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

const createCharacterDisplay = (characterName, description, style) => (
    <div className="character-display" style={style}>
        <div className="character-name">
            {characterName}
        </div>
        <div className="description-text">
            {description}
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
                row.description = this.props[soulName].description;
            }
            rows.push(row);
        });
        return (
            <div className="group-display-box" style={this.props.style}>
                {rows.map((row, index) => {
                    const lastElementStyle = index === rows.length - 1
                        ? { borderBottom: 'none', height: '170px' }
                        : {};
                    return (
                        <div
                            className="group-display-box-row"
                            key={`group-display-box-row-${index}`}
                        >
                            {createSoulDisplay(row.soul, { ...lastElementStyle })}
                            {createSoulDisplay(row.role, { left: '10%', ...lastElementStyle })}
                            {createCharacterDisplay(row.character, row.description, { left: '20%', ...lastElementStyle })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default GroupDisplayBox;
import React, { Component } from 'react';
import { SoulNames, SoulNamesTranslation } from '../../js/enums';
import '../../css/groupDisplayBox.css';

const createSoulDisplay = (soulNameTranslation, key, style) => {
    const soulKey = Object.keys(SoulNamesTranslation).reduce((acc, key) => {
        if (SoulNamesTranslation[key] === soulNameTranslation) {
            acc = key;
        }
        return acc;
    }, '');
    const soulName = SoulNames[soulKey];
    return (
        <div className="soul-display" key={key} style={style}>
            <img
                className="soul-gif"
                src={`/images/${soulName}.gif`}
                alt="soul gif"
            />
        </div>
    );
};

const createCharacterDisplay = (characterName, key, style) => (
    <div className="character-display" key={key} style={style}>
        <div className="character-name">
            {characterName}
        </div>
    </div>
);


class GroupDisplayBox extends Component {
    render() {
        const souls = [];
        const roles = [];
        const characters = [];
        Object.keys(SoulNamesTranslation).forEach(soulKey => {
            const soulName = SoulNamesTranslation[soulKey];
            souls.push(soulName);
            if (this.props[soulName]) {
                roles.push(this.props[soulName].role);
                characters.push(this.props[soulName].character);
            }
        });
        return (
            <div className="group-display-box" style={this.props.style}>
                {souls.map((soul, index) => {
                    const key = `group-display-box-soul-${index}`;
                    const style = {
                        top: `${index * 70}px`
                    };
                    return createSoulDisplay(soul, key, style);
                })}
                {roles.map((role, index) => {
                    const key = `group-display-box-role-${index}`;
                    const style = {
                        left: '70px',
                        top: `${index * 70}px`
                    };
                    return createSoulDisplay(role, key, style);
                })}
                {characters.map((character, index) => {
                    const key = `group-display-box-character-${index}`;
                    const style = {
                        left: '140px',
                        top: `${index * 70}px`
                    };
                    return createCharacterDisplay(character, key, style);
                })}
            </div>
        );
    }
}

export default GroupDisplayBox;
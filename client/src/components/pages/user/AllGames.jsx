import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../css/allGames.css';
import { getGroups } from '../../../js/actions';
import { SoulNamesTranslation, SoulTranslationColorMap } from '../../../js/enums';

const createGameForRender = (gameData, index) => (
    <div
        className="all-games-line"
        key={`all-games-line-${index}`}
    >
        <div className="all-games-line__info">
            <div className="all-games-line__info--name">
                {gameData.name}
            </div>
            <div className="all-games-line__info--date">
                {gameData.time_period}
            </div>
        </div>
        <div className="all-games-line__player all-games-line__rebel">
            <div className="all-games-line__character">
                {gameData[`${SoulNamesTranslation.REBEL}_character`]}
            </div>
            <div
                className="all-games-line__soul"
                style={{ color: SoulTranslationColorMap[gameData[`${SoulNamesTranslation.REBEL}_role`]] || 'transparent' }}
            >
                {gameData[`${SoulNamesTranslation.REBEL}_role`]}
            </div>
        </div>
        <div className="all-games-line__player all-games-line__leader">
            <div className="all-games-line__character">
                {gameData[`${SoulNamesTranslation.LEADER}_character`]}
            </div>
            <div
                className="all-games-line__soul"
                style={{ color: SoulTranslationColorMap[gameData[`${SoulNamesTranslation.LEADER}_role`]] || 'transparent' }}
            >
                {gameData[`${SoulNamesTranslation.LEADER}_role`]}
            </div>
        </div>
        <div className="all-games-line__player all-games-line__romantic">
            <div className="all-games-line__character">
                {gameData[`${SoulNamesTranslation.ROMANTIC}_character`]}
            </div>
            <div
                className="all-games-line__soul"
                style={{ color: SoulTranslationColorMap[gameData[`${SoulNamesTranslation.ROMANTIC}_role`]] || 'transparent' }}
            >
                {gameData[`${SoulNamesTranslation.ROMANTIC}_role`]}
            </div>
        </div>
        <div className="all-games-line__player all-games-line__realist">
            <div className="all-games-line__character">
                {gameData[`${SoulNamesTranslation.REALIST}_character`]}
            </div>
            <div
                className="all-games-line__soul"
                style={{ color: SoulTranslationColorMap[gameData[`${SoulNamesTranslation.REALIST}_role`]] || 'transparent' }}
            >
                {gameData[`${SoulNamesTranslation.REALIST}_role`]}
            </div>
        </div>
        <div className="all-games-line__player all-games-line__messiah">
            <div className="all-games-line__character">
                {gameData[`${SoulNamesTranslation.MESSIAH}_character`]}
            </div>
            <div
                className="all-games-line__soul"
                style={{ color: SoulTranslationColorMap[gameData[`${SoulNamesTranslation.MESSIAH}_role`]] || 'transparent' }}
            >
                {gameData[`${SoulNamesTranslation.MESSIAH}_role`]}
            </div>
        </div>
    </div>
);


class AllGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamesData: []
        };
    }

    componentDidMount() {
        this.updateGamesData();
    }

    componentWillUpdate() {
        this.updateGamesData();
    }

    updateGamesData = async () => {
        if (!this.props.groups) {
            await this.props.dispatch(getGroups());
        }
        let allGamesUpToDate = true;
        this.props.groups.forEach((group, index) => {
            if (JSON.stringify(group) !== JSON.stringify(this.state.gamesData[index])) {
                allGamesUpToDate = false;
            }
        });
        if (allGamesUpToDate) {
            return;
        }
        this.setState({ gamesData: this.props.groups });
    };

    render() {
        return (
            <section className="page-container">
                <div>
                    {this.state.gamesData.map((gameData, index) => createGameForRender(gameData, index))}
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ groups }) => ({ groups });

const ConnectedAllGames = connect(mapStateToProps)(AllGames);

export default ConnectedAllGames;
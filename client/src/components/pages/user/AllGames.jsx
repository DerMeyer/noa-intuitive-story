import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../css/allGames.css';
import { getGroups } from '../../../js/actions';
import { SoulNamesTranslation, SoulTranslationColorMap, SoulDirectTranslations } from '../../../js/enums';
import { Link } from 'react-router-dom';

const createGameForRender = (gameData, index) => (
    <div
        className="all-games-line"
        key={`all-games-line-${index}`}
    >
        <Link
            to={`group/${gameData.id}`}
            className="all-games-line__info"
            style={{ color: 'black' }}
        >
            <div className="all-games-line__info--name">
                {gameData.name}
            </div>
            <div className="all-games-line__info--date">
                {gameData.time_period}
            </div>
        </Link>
        <div className="all-games-line__player all-games-line__rebel">
            <div className="all-games-line__character">
                {gameData[`${SoulNamesTranslation.REBEL}_character`]}
            </div>
            <div
                className="all-games-line__soul"
                style={{ color: SoulTranslationColorMap[gameData[`${SoulNamesTranslation.REBEL}_role`]] || 'transparent' }}
            >
                {SoulDirectTranslations[gameData[`${SoulNamesTranslation.REBEL}_role`]]}
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
                {SoulDirectTranslations[gameData[`${SoulNamesTranslation.LEADER}_role`]]}
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
                {SoulDirectTranslations[gameData[`${SoulNamesTranslation.ROMANTIC}_role`]]}
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
                {SoulDirectTranslations[gameData[`${SoulNamesTranslation.REALIST}_role`]]}
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
                {SoulDirectTranslations[gameData[`${SoulNamesTranslation.MESSIAH}_role`]]}
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
        console.log(SoulTranslationColorMap.REBEL);
        return (
            <section className="page-container">
                <div className="all-games-line" style={{ margin: '20px 0 40px 0' }}>
                    <div className="all-games-line__info" style={{ color: 'black', fontSize: '20px' }}>
                        <div className="all-games-line__info--name">
                            Traveling
                        </div>
                        <div className="all-games-line__info--date">
                            to
                        </div>
                    </div>
                    <div className="all-games-line__player all-games-line__rebel" style={{ color: SoulTranslationColorMap[SoulNamesTranslation.REBEL], backgroundColor: 'transparent' }}>
                        <div className="all-games-line__character" style={{ fontSize: '24px' }}>
                            Gol
                        </div>
                        <div className="all-games-line__soul">
                            The Rebel
                        </div>
                    </div>
                    <div className="all-games-line__player all-games-line__leader" style={{ color: SoulTranslationColorMap[SoulNamesTranslation.LEADER], backgroundColor: 'transparent' }}>
                        <div className="all-games-line__character" style={{ fontSize: '24px' }}>
                            Grün
                        </div>
                        <div className="all-games-line__soul">
                            The Leader
                        </div>
                    </div>
                    <div className="all-games-line__player all-games-line__romantic" style={{ color: SoulTranslationColorMap[SoulNamesTranslation.ROMANTIC], backgroundColor: 'transparent' }}>
                        <div className="all-games-line__character" style={{ fontSize: '24px' }}>
                            Vermell
                        </div>
                        <div className="all-games-line__soul">
                            The Romantic
                        </div>
                    </div>
                    <div className="all-games-line__player all-games-line__realist" style={{ color: SoulTranslationColorMap[SoulNamesTranslation.REALIST], backgroundColor: 'transparent' }}>
                        <div className="all-games-line__character" style={{ fontSize: '24px' }}>
                            Bezrechu
                        </div>
                        <div className="all-games-line__soul">
                            The Realist
                        </div>
                    </div>
                    <div className="all-games-line__player all-games-line__messiah" style={{ color: SoulTranslationColorMap[SoulNamesTranslation.MESSIAH], backgroundColor: 'transparent' }}>
                        <div className="all-games-line__character" style={{ fontSize: '24px' }}>
                            Sagol
                        </div>
                        <div className="all-games-line__soul">
                            The Messiah
                        </div>
                    </div>
                </div>
                {
                    this.state.gamesData
                        .sort((a, b) => a.time_period - b.time_period)
                        .map((gameData, index) => createGameForRender(gameData, index))
                }
            </section>
        );
    }
}

const mapStateToProps = ({ groups }) => ({ groups });

const ConnectedAllGames = connect(mapStateToProps)(AllGames);

export default ConnectedAllGames;
// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import Badge from 'app/components/badge';
import {wrapWithPreventDoubleTap} from 'app/utils/tap';
import {changeOpacity, makeStyleSheetFromTheme} from 'app/utils/theme';

export default class TeamsListItem extends React.PureComponent {
    static propTypes = {
        currentTeamId: PropTypes.string.isRequired,
        currentUrl: PropTypes.string.isRequired,
        selectTeam: PropTypes.func.isRequired,
        team: PropTypes.object.isRequired,
        teamMember: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired
    };

    selectTeam = wrapWithPreventDoubleTap(() => {
        this.props.selectTeam(this.props.team);
    });

    render() {
        const {
            currentTeamId,
            currentUrl,
            team,
            teamMember,
            theme
        } = this.props;
        const styles = getStyleSheet(theme);

        let current;
        let badge;
        if (team.id === currentTeamId) {
            current = (
                <View style={styles.checkmarkContainer}>
                    <IonIcon
                        name='md-checkmark'
                        style={styles.checkmark}
                    />
                </View>
            );
        }

        let badgeCount = 0;
        if (teamMember.mention_count) {
            badgeCount = teamMember.mention_count;
        } else if (teamMember.msg_count) {
            badgeCount = -1;
        }

        if (badgeCount) {
            badge = (
                <Badge
                    style={styles.badge}
                    countStyle={styles.mention}
                    count={badgeCount}
                    minHeight={20}
                    minWidth={20}
                />
            );
        }

        return (
            <View style={styles.teamWrapper}>
                <TouchableHighlight
                    underlayColor={changeOpacity(theme.sidebarTextHoverBg, 0.5)}
                    onPress={this.selectTeam}
                >
                    <View style={styles.teamContainer}>
                        <View style={styles.teamIconContainer}>
                            <Text style={styles.teamIcon}>
                                {team.display_name.substr(0, 2).toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.teamNameContainer}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={styles.teamName}
                            >
                                {team.display_name}
                            </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={styles.teamUrl}
                            >
                                {`${currentUrl}/${team.name}`}
                            </Text>
                        </View>
                        {current}
                    </View>
                </TouchableHighlight>
                {badge}
            </View>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        teamWrapper: {
            marginTop: 20
        },
        teamContainer: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 16
        },
        teamIconContainer: {
            alignItems: 'center',
            backgroundColor: theme.sidebarText,
            borderRadius: 2,
            height: 40,
            justifyContent: 'center',
            width: 40
        },
        teamIcon: {
            color: theme.sidebarBg,
            fontFamily: 'OpenSans',
            fontSize: 18,
            fontWeight: '600'
        },
        teamNameContainer: {
            flex: 1,
            flexDirection: 'column',
            marginLeft: 10
        },
        teamName: {
            color: theme.sidebarText,
            fontSize: 18
        },
        teamUrl: {
            color: changeOpacity(theme.sidebarText, 0.5),
            fontSize: 12
        },
        checkmarkContainer: {
            alignItems: 'flex-end'
        },
        checkmark: {
            color: theme.sidebarText,
            fontSize: 20
        },
        badge: {
            backgroundColor: theme.mentionBj,
            borderColor: theme.sidebarHeaderBg,
            borderRadius: 10,
            borderWidth: 1,
            flexDirection: 'row',
            padding: 3,
            position: 'absolute',
            left: 45,
            top: -7.5
        },
        mention: {
            color: theme.mentionColor,
            fontSize: 10
        }
    };
});

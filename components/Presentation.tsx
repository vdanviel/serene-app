import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { MonoText } from "@/components/StyledText";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ExternalLink } from '@/components/ExternalLink';

interface Me {
    name: string;
    date: string;
    project: string;
    github: string;
    repo: string;
    link: string;
}

const vdanviel: Me = {
    name: "vdanviel",
    project: "serene",
    github: "https://github.com/vdanviel",
    date: "29/07/2024",
    repo: "https://github.com/vdanviel/serene-app",
    link: "https://vdanviel.github.io/"
};

export default function Presentation() {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.default.background,
            padding: 15,
        },
        text: {
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
        },
        link: {
            color: colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint
        }
    });

    return (
        <View style={styles.container}>
            <ExternalLink href={vdanviel.github} style={styles.link}>
                made by <AntDesign name="github" size={15} color={styles.text.color} /> vdanviel
            </ExternalLink>
            <MonoText style={styles.text}>{"{"}</MonoText>
            <MonoText style={styles.text}>&nbsp;&nbsp; name: "{vdanviel.name}"</MonoText>
            <MonoText style={styles.text}>&nbsp;&nbsp; project: "{vdanviel.project}"</MonoText>
            <MonoText style={styles.text}>&nbsp;&nbsp; date: "{vdanviel.date}"</MonoText>
            <MonoText style={styles.text}>
                &nbsp;&nbsp; repository:&nbsp;
                <ExternalLink href={vdanviel.repo} style={styles.link}>
                    <MonoText style={styles.link} lineBreakMode='tail' numberOfLines={1}>
                        "{vdanviel.repo.substring(0, vdanviel.repo.length / 2) + "..."}"
                    </MonoText>
                </ExternalLink>
            </MonoText>
            <MonoText style={styles.text}>
                &nbsp;&nbsp; portfolio:&nbsp;
                <ExternalLink href={vdanviel.link} style={styles.link}>
                    <MonoText style={styles.link} >
                        "{vdanviel.link.substring(0, vdanviel.link.length / 2) + "..."}"
                    </MonoText>
                </ExternalLink>
            </MonoText>
            <MonoText style={styles.text}>{"}"}</MonoText>
        </View>
    );
}

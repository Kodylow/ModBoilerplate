"use client";

import Container from "@/components/container";
import {
    Button,
    Icon,
    NostrProvider,
    Text,
    WebLNProvider,
    useNostr,
    useNostrContext,
    useWebLNContext,
} from "@fedibtc/ui";

function NostrPubkey() {
    const { pubkey} = useNostr();

    return (
        <Text>
            Your Nostr Pubkey is: {pubkey}
        </Text>
    );
}

function Content() {
    const { isLoading: isWeblnLoading, error: weblnError } = useWebLNContext();
    const { isLoading: isNostrLoading, error: nostrError } = useNostrContext();

    const error = weblnError || nostrError;

    if (isWeblnLoading) {
        return (
            <Container>
                <Icon icon="IconLoader2" size="lg" className="animate-spin" />
                <Text>Initializing WebLN...</Text>
            </Container>
        );
    }

    if (isNostrLoading) {
        return (
            <Container>
                <Icon icon="IconLoader2" size="lg" className="animate-spin" />
                <Text>Initializing Nostr...</Text>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Text weight="bold" variant="h1">
                    Error
                </Text>
                <Text>{error.message}</Text>
            </Container>
        );
    }

    return (
        <Container>
            <Text weight="bold" variant="h1">
                Fedi Mod Boilerplate
            </Text>
            <Text>
                A lightweight and easy-to-use template for building Fedi Mods
            </Text>
            <Button
                href="https://fedibtc.github.io/fedi-docs/docs/mods/developers/intro"
                icon="IconExternalLink"
            >
                Documentation
            </Button>
            <Button
                href="https://github.com/fedibtc/ModBoilerplate"
                icon="IconExternalLink"
            >
                Github
            </Button>
            {!isWeblnLoading && !isNostrLoading && <NostrPubkey />}
        </Container>
    );
}

export default function Index() {
    return (
        <WebLNProvider>
            <NostrProvider>
                <Content />
            </NostrProvider>
        </WebLNProvider>
    );
}

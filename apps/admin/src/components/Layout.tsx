import Head from 'next/head';
import {
  createStyles,
  Navbar,
  getStylesRef,
  rem,
  AppShell,
  Header,
  MediaQuery,
  Burger,
  Text,
  useMantineTheme
} from '@mantine/core';
import {
  IconArrowBack,
  IconDice5,
  IconGift,
  IconHome,
  IconMedal,
  IconUsers,
  IconDevicesPc,
  IconMovie
} from '@tabler/icons-react';
import { useState } from 'react';
import Link from 'next/link';

import { usePermissions } from '@/hooks/permissions';
import { Permission } from 'database';

const useStyles = createStyles((theme) => {
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: `calc(${theme.spacing.md} * 1.5)`,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`
    },

    footer: {
      marginTop: theme.spacing.md,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${getStylesRef('icon')}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: getStylesRef('icon'),
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${getStylesRef('icon')}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
        }
      }
    }
  };
});

const SIDEBAR_DATA: {
  link: string;
  label: string;
  icon: React.FC<any>;
  permission?: Permission;
}[] = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/users', label: 'Users', icon: IconUsers, permission: 'MANAGE_USERS' },
  { link: '/raffles', label: 'Raffles', icon: IconDice5, permission: 'MANAGE_RAFFLES' },
  { link: '/giveaways', label: 'Giveaways', icon: IconGift, permission: 'MANAGE_GIVEAWAYS' },
  { link: '/reloads', label: 'Reloads', icon: IconGift, permission: 'MANAGE_RELOADS' },
  {
    link: '/leaderboards',
    label: 'Leaderboards',
    icon: IconMedal,
    permission: 'MANAGE_LEADERBOARDS'
  },
  { link: '/ips', label: 'IPs', icon: IconDevicesPc, permission: 'MANAGE_IPS' },
  { link: '/clips', label: 'Clips', icon: IconMovie, permission: 'MANAGE_CLIPS' }
];

function Layout({ title, children }: { title?: string; children: React.ReactNode }) {
  const permissions = usePermissions();

  const theme = useMantineTheme();

  const { classes, cx } = useStyles();
  const [active, setActive] = useState(
    SIDEBAR_DATA.find((item) => {
      return item.label.toLowerCase() === window.location.pathname.replace('/', '');
    })?.label || 'Home'
  );
  const [opened, setOpened] = useState(false);

  const links = SIDEBAR_DATA.map((item) => {
    if (item.permission && !permissions.permissions.includes(item.permission)) {
      return null;
    }
    return (
      <Link
        href={item.link}
        key={item.label}
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    );
  });

  function getUrl() {
    if (process.env.NODE_ENV === 'production') {
      if (!window.location.hostname.includes('localhost')) {
        return 'https://tck.gg';
      }
      return 'http://localhost:8007';
    }
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8000';
    }
    return '';
  }

  return (
    <>
      <Head>
        <title>{`${title ? `${title} - ` : ''}TCK Admin`}</title>
      </Head>
      <AppShell
        navbarOffsetBreakpoint='sm'
        asideOffsetBreakpoint='sm'
        navbar={
          <Navbar hiddenBreakpoint='sm' hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow>{links}</Navbar.Section>
            <Navbar.Section className={classes.footer}>
              <a href={getUrl()} className={classes.link}>
                <IconArrowBack className={classes.linkIcon} stroke={1.5} />
                <span>Back to TCK</span>
              </a>
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p='md'>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => {
                    return setOpened((o) => {
                      return !o;
                    });
                  }}
                  size='sm'
                  color={theme.colors.gray[6]}
                  mr='xl'
                />
              </MediaQuery>

              <Text>TCK Admin Panel</Text>
            </div>
          </Header>
        }
        styles={(theme) => {
          return {
            main: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
            }
          };
        }}
      >
        {children}
      </AppShell>
    </>
  );
}

export default Layout;

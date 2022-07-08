import {
  Avatar,
  CardActionArea,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  SecurityAuditReportIcon,
  TelegramIcon,
  TokenExplorerBscScanIcon,
  TwitterIcon,
  WhitePaperIcon,
} from "../../assets/Icons";
import { HOME_LINK, SOCIAL_MEDIA } from "../../constants";
import { useAppContext } from "../../hooks";
import { StyledPaper } from "../../styled";
import BlackButton from "../BlackButton";
import colors from "./../../colors";
import Web3 from "web3";
import { BUSDContract, tokenAbi, USDCContract, USDTContract } from "../../config";

export default function BannerSection({ address, SetAddress, balance, USDTBalance,USDCBalance,BUSDBalance }) {
  const [height, setHeight] = useState();

  const { isSmall } = useAppContext();
  const web3 = new Web3(Web3.givenProvider)
 

  // useEffect(() => {
  //   connect();
  // }, []);

  // async function connect() {


  //   try {
  //     const accounts = await window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((r) => {
  //         // SetAddress(r[0]);
  //         // console.log("accounts",address)
 
  //       });
  //   } catch (error) {
  //     if (error.code === 4001) {
  //     }
  //   }
  // }

  const ActionButtons = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Fragment>
        <BlackButton LinkComponent={"a"} href={HOME_LINK}>
          Home
        </BlackButton>

        <BlackButton
          onMouseOver={!isSmall ? handleClick : null}
          onClick={address ? handleClick : ''}
        >
          {address
            ? `${address.slice(0, 5)}...${address.slice(-4)}`
            : "Connect Wallet"}
        </BlackButton>

        {address && (
          <Menu
            id="menu-ico-1"
            anchorEl={anchorEl}
            open={open}
            defaultValue=""
            PaperProps={{
              elevation: 2,
              sx: {
                mt: 0.5,
                width: "100px",
                border: `2px solid ${colors.white.v3}`,
                borderRadius: 2,
                "& ul": {
                  p: 0,
                },
              },
            }}
            onClose={handleClose}
            disableAutoFocusItem
          >
            <MenuItem onClick={handleClose}>{(balance/1000000000000000000).toFixed(2)} BNB</MenuItem>
            <MenuItem onClick={handleClose}>{USDTBalance &&  (USDTBalance/1000000000000000000).toFixed(2)} USDT</MenuItem>
            <MenuItem onClick={handleClose}>{USDCBalance &&  (USDCBalance/1000000000000000000).toFixed(2)} BUSD</MenuItem>
            <MenuItem onClick={handleClose}>{BUSDBalance &&  (BUSDBalance/1000000000000000000).toFixed(2)} USDC</MenuItem>
            <Divider
              // sx={{ borderColor: colors.yellow.v3, borderWidth: 2 }}
              style={{ margin: 0 }}
            />
            {/* <MenuItem onClick={()=>{SetAddress()}}>Logout</MenuItem> */}
          </Menu>
        )}
      </Fragment>
    );
  };
  //  window.ethereum.on("accountsChanged",(e,r)=>{window.location.reload()})

  return (
    <div>
      <Box>
        <img src="/assets/banner.png" alt="" height={"100%"} width="100%" />
      </Box>

      <Hidden mdUp>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="end"
          px={2}
          sx={{
            transform: "translateY(-60%)",
          }}
        >
          <ActionButtons />
        </Stack>
      </Hidden>

      <Container
        sx={{
          mb: !isSmall && -height / 2 + "px",
          transform: !isSmall && "translateY(-50%)",
        }}
        ref={(ele) => !isSmall && setHeight(ele?.clientHeight)}
      >
        <StyledPaper sx={{ p: isSmall ? 2 : 3, pt: isSmall ? 0 : 3 }}>
          <Grid container spacing={isSmall ? 1 : 3}>
            <Grid
              item
              md={2}
              xs={4}
              ref={(ele) => isSmall && setHeight(ele?.clientHeight)}
            >
              <Paper
                sx={{
                  mb: isSmall && "-50%",
                  transform: isSmall && "translateY(-48%)",
                  p: 0.8,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <CardActionArea LinkComponent={"a"} href={HOME_LINK}>
                  <Avatar
                    src="/assets/logo.png"
                    sx={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 2,
                    }}
                  />
                </CardActionArea>
              </Paper>
            </Grid>

            <Hidden mdUp>
              <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant={isSmall ? "h6" : "h4"}
                  sx={{ fontWeight: "bolder", ml: 1 }}
                >
                  BabyDoge
                </Typography>
              </Grid>
            </Hidden>

            <Grid item md={10}>
              <Stack
                direction="row"
                spacing={isSmall ? 0 : 2}
                justifyContent="space-between"
                alignItems={"center"}
                sx={{
                  mb: 1,
                  mt: isSmall && 1,
                  "& svg": {
                    height: 30,
                    width: 30,
                  },
                }}
              >
                <Stack
                  direction={isSmall ? "column" : "row"}
                  spacing={!isSmall && 2}
                  alignItems={!isSmall && "center"}
                >
                  <Hidden mdDown>
                    <Typography
                      variant={isSmall ? "h6" : "h4"}
                      sx={{ fontWeight: "bolder" }}
                    >
                      BabyDoge
                    </Typography>
                  </Hidden>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={"flex-end"}
                  >
                    {React.Children.toArray(
                      SOCIAL_MEDIA.map(({ link, icon }, index) => {
                        return (
                          link && (
                            <IconButton
                              size="small"
                              key={`banner-icons-${index}`}
                              LinkComponent="a"
                              href={link}
                              sx={{
                                position: "relative",
                                "&:after": {
                                  content: "''",
                                  position: "absolute",
                                  top: "0",
                                  left: "0",
                                  width: "0",
                                  height: "100%",
                                  backgroundColor: "rgba(255,255,255,0.4)",
                                  WebkitTransition: "none",
                                  MozTransition: "none",
                                  transition: "none",
                                },
                                "&:hover:after": {
                                  width: "120%",
                                  backgroundColor: "rgba(255,255,255,0)",
                                  WebkitTransition: "all 0.4s ease-in-out",
                                  MozTransition: "all 0.4s ease-in-out",
                                  transition: "all 0.4s ease-in-out",
                                },
                              }}
                            >
                              {icon}
                            </IconButton>
                          )
                        );
                      })
                    )}
                  </Stack>
                </Stack>
                <Hidden mdDown>
                  <Stack direction="row" spacing={1}>
                    <ActionButtons />
                  </Stack>
                </Hidden>
              </Stack>

              <Typography
                variant={isSmall ? "body1" : "h6"}
                fontWeight={400}
                lineHeight={1.3}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                vitae aut ex sequi dolor, tempora labore laborum porro deleniti
                ab harum ullam voluptatum, incidunt deserunt dignissimos.
                Aspernatur similique, officiis temporibus natus omnis atque
                possimus expedita illum animi rerum facilis mollitia autem
                possimus expedita illum animi rerum facilis mollitia autem
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </div>
  );
}

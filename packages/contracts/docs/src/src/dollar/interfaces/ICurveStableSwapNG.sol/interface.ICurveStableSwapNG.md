# ICurveStableSwapNG
[Git Source](https://github.com/ubiquity/ubiquity-dollar/blob/565aaa6bed7cb481fd57c9fc6a7b1052ff2aa816/src/dollar/interfaces/ICurveStableSwapNG.sol)

**Inherits:**
[ICurveStableSwapMetaNG](/src/dollar/interfaces/ICurveStableSwapMetaNG.sol/interface.ICurveStableSwapMetaNG.md)

Curve's interface for plain pool which contains only USD pegged assets


## Functions
### add_liquidity


```solidity
function add_liquidity(uint256[] memory _amounts, uint256 _min_mint_amount, address _receiver)
    external
    returns (uint256);
```

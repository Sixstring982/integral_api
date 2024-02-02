{
  description = "Integral interview";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nix-filter.url = "github:numtide/nix-filter";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs, flake-utils, nix-filter }:
    flake-utils.lib.eachDefaultSystem (system:
      let legacyPackages = nixpkgs.legacyPackages.${system}; in
      {
        devShells = {
          default = legacyPackages.mkShell {
            packages = [
              legacyPackages.bun
              legacyPackages.nodejs_21
            ];
          };
        };
      });
}
